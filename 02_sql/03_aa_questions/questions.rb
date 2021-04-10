require 'sqlite3'
require 'singleton'
require 'active_support/inflector'

class QuestionsDatabase < SQLite3::Database
  include Singleton

  def initialize
    super('questions.db')
    self.type_translation = true
    self.results_as_hash = true
  end
end

class ModelBase
  def self.find_by_id(id)
    data = QuestionsDatabase.instance.execute(<<-SQL, id)
      SELECT
        *
      FROM
        #{table}
      WHERE
        id = ?
    SQL
    self.new(data.first)
  end

  def self.where(options)
    if options.is_a?(Hash)
      where_statement = options.keys.map { |column| "#{column} = ?" }.join("AND")
      values = options.values
    else
      where_statement = options
      values = []
    end

    data = QuestionsDatabase.instance.execute(<<-SQL, values)
      SELECT
        *
      FROM
        #{table}
      WHERE
        #{where_statement}
    SQL
    data.map { |datum| self.new(datum) }
  end

  def self.find_by(options)
    self.where(options)
  end

  def self.all
    data = QuestionsDatabase.instance.execute("SELECT * FROM #{table}")
    data.map { |datum| self.new(datum) }
  end

  def save
    if @id
      update
    else
      insert
    end
  end

  def update
    set_statement = columns.map { |column| "#{column} = ?"}.join(", ")
    QuestionsDatabase.instance.execute(<<-SQL, *column_values, @id)
      UPDATE
        #{self.class.table}
      SET
        #{set_statement}
      WHERE
        id = ?
    SQL
  end

  def insert
    question_marks = columns.map { "?" }.join(", ")
    QuestionsDatabase.instance.execute(<<-SQL, *column_values)
      INSERT INTO
        #{self.class.table} (#{columns.join(", ")})
      VALUES
        (#{question_marks})
    SQL
    @id = QuestionsDatabase.instance.last_insert_row_id
  end

  private

  def self.table
    self.name.tableize
  end

  def columns
    columns = instance_variables.map { |var| var.to_s[1..-1] }
    columns.delete("id")
    columns
  end

  def column_values
    columns.map { |column| self.instance_variable_get("@#{column}") }
  end
end

class User < ModelBase
  def self.find_by_name(fname, lname)
    data = QuestionsDatabase.instance.execute(<<-SQL, fname, lname)
      SELECT
        *
      FROM
        users
      WHERE
        fname = ? AND
        lname = ?
    SQL
    User.new(data.first)
  end
  attr_accessor :fname, :lname

  def initialize(options = {})
    @id = options['id']
    @fname = options['fname']
    @lname = options['lname']
  end

  def authored_questions
    Question.find_by_author_id(@id)
  end

  def authored_replies
    Reply.find_by_user_id(@id)
  end

  def followed_questions
    QuestionFollow.followed_questions_for_user_id(@id)
  end

  def liked_questions
    QuestionLike.liked_questions_for_user_id(@id)
  end

  def average_karma
    data = QuestionsDatabase.instance.execute(<<-SQL, @id)
      SELECT
        AVG(num_likes) AS average_karma
      FROM
        (
          SELECT
            COUNT(question_likes.user_id) as num_likes
          FROM
            questions
          LEFT JOIN
            question_likes ON question_likes.question_id = questions.id
          WHERE
            questions.author_id = ?
          GROUP BY
            questions.id
        )        
    SQL
    data.first["average_karma"]
  end
end

class Question < ModelBase
  def self.find_by_author_id(author_id)
    data = QuestionsDatabase.instance.execute(<<-SQL, author_id)
      SELECT
        *
      FROM
        questions
      WHERE
        author_id = ?
    SQL
    data.map { |datum| Question.new(datum) }
  end

  def self.most_followed(n = 1)
    QuestionFollow.most_followed_questions(n)
  end

  def self.most_liked(n = 1)
    QuestionLike.most_liked_questions(n)
  end

  attr_accessor :title, :body, :author_id
  
  def initialize(options = {})
    @id = options['id']
    @title = options['title']
    @body = options['body']
    @author_id = options['author_id']
  end

  def author
    User.find_by_id(@author_id)
  end

  def replies
    Reply.find_by_question_id(@id)
  end

  def followers
    QuestionFollow.followers_for_question_id(@id)
  end

  def likers
    QuestionLike.likers_for_question_id(@id)
  end

  def num_likes
    QuestionLike.num_likes_for_question_id(@id)
  end
end

class Reply < ModelBase
  def self.find_by_user_id(user_id)
    data = QuestionsDatabase.instance.execute(<<-SQL, user_id)
      SELECT
        *
      FROM
        replies
      WHERE
        user_id = ?
    SQL
    data.map { |datum| Reply.new(datum) }
  end

  def self.find_by_question_id(question_id)
    data = QuestionsDatabase.instance.execute(<<-SQL, question_id)
      SELECT
        *
      FROM
        replies
      WHERE
        question_id = ?
    SQL
    data.map { |datum| Reply.new(datum) }
  end

  attr_accessor :body, :question_id, :parent_id, :author_id
  
  def initialize(options = {})
    @id = options['id']
    @body = options['body']
    @question_id = options['question_id']
    @parent_id = options['parent_id']
    @user_id = options['user_id']
  end

  def author
    User.find_by_id(@user_id)
  end

  def question
    Question.find_by_id(@question_id)
  end

  def parent_reply
    Reply.find_by_id(@parent_id)
  end

  def child_replies
    data = QuestionsDatabase.instance.execute(<<-SQL, @id)
      SELECT
        *
      FROM
        replies
      WHERE
        parent_id = ?
    SQL
    data.map { |datum| Reply.new(datum) }
  end
end

class QuestionFollow < ModelBase
  attr_accessor :user_id, :question_id

  def self.followers_for_question_id(question_id)
    data = QuestionsDatabase.instance.execute(<<-SQL, question_id)
      SELECT
        users.*
      FROM
        users
      JOIN
        question_follows ON question_follows.user_id = users.id
      WHERE
        question_follows.question_id = ?
    SQL
    data.map { |datum| User.new(datum) }
  end

  def self.followed_questions_for_user_id(user_id)
    data = QuestionsDatabase.instance.execute(<<-SQL, user_id)
      SELECT
        questions.*
      FROM
        questions
      JOIN
        question_follows ON question_follows.question_id = questions.id
      WHERE
        question_follows.user_id = ?
    SQL
    data.map { |datum| Question.new(datum) }
  end

  def self.most_followed_questions(n)
    data = QuestionsDatabase.instance.execute(<<-SQL, n)
      SELECT
        questions.*
      FROM
        questions
      JOIN
        question_follows ON question_follows.question_id = questions.id
      GROUP BY
        questions.id
      ORDER BY
        COUNT(*) DESC
      LIMIT ?
    SQL
    data.map { |datum| Question.new(datum) }
  end
  
  def initialize(options = {})
    @id = options['id']
    @user_id = options['user_id']
    @question_id = options['question_id']
  end
end

class QuestionLike < ModelBase
  def self.likers_for_question_id(question_id)
    data = QuestionsDatabase.instance.execute(<<-SQL, question_id)
      SELECT
        users.*
      FROM
        users
      JOIN
        question_likes ON question_likes.user_id = users.id
      WHERE
        question_likes.question_id = ?
    SQL
    data.map { |datum| User.new(datum) }
  end

  def self.num_likes_for_question_id(question_id)
    data = QuestionsDatabase.instance.execute(<<-SQL, question_id)
      SELECT
        COUNT(*) AS num_likes
      FROM
        question_likes
      WHERE question_id = ?
    SQL
    data.first["num_likes"]
  end

  def self.liked_questions_for_user_id(user_id)
    data = QuestionsDatabase.instance.execute(<<-SQL, user_id)
      SELECT
        questions.*
      FROM
        questions
      JOIN
        question_likes ON question_likes.question_id = questions.id
      WHERE
        question_likes.user_id = ?
    SQL
    data.map { |datum| Question.new(datum) }
  end

  def self.most_liked_questions(n)
    data = QuestionsDatabase.instance.execute(<<-SQL, n)
      SELECT
        questions.*
      FROM
        questions
      JOIN
        question_likes ON question_likes.question_id = questions.id
      GROUP BY
        questions.id
      ORDER BY
        COUNT(*) DESC
      LIMIT ?
    SQL
    data.map { |datum| Question.new(datum) }
  end

  attr_accessor :user_id, :question_id

  def initialize(options = {})
    @id = options['id']
    @user_id = options['user_id']
    @question_id = options['question_id']
  end
end