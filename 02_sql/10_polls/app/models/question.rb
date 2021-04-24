# == Schema Information
#
# Table name: questions
#
#  id         :bigint           not null, primary key
#  text       :string           not null
#  poll_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Question < ApplicationRecord
  validates :text,
    presence: true

  belongs_to :poll

  has_many :answer_choices

  has_many :responses,
    through: :answer_choices

  def results
    choices = self.answer_choices
      .left_outer_joins(:responses)
      .select('answer_choices.*', 'COUNT(responses.id) AS response_count')
      .group(:id)

    response_counts = {}
    choices.each do |choice|
      response_counts[choice.text] = choice.response_count
    end
    response_counts
  end
end
