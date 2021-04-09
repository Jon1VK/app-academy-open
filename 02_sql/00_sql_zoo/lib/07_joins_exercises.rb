# == Schema Information
#
# Table name: actors
#
#  id          :integer      not null, primary key
#  name        :string
#
# Table name: movies
#
#  id          :integer      not null, primary key
#  title       :string
#  yr          :integer
#  score       :float
#  votes       :integer
#  director_id :integer
#
# Table name: castings
#
#  movie_id    :integer      not null, primary key
#  actor_id    :integer      not null, primary key
#  ord         :integer

require_relative './sqlzoo.rb'

def example_join
  execute(<<-SQL)
    SELECT
      *
    FROM
      movies
    JOIN
      castings ON movies.id = castings.movie_id
    JOIN
      actors ON castings.actor_id = actors.id
    WHERE
      actors.name = 'Sean Connery'
  SQL
end

def ford_films
  # List the films in which 'Harrison Ford' has appeared.
  execute(<<-SQL)
    SELECT
      movies.title
    FROM
      movies
    JOIN
      castings ON castings.movie_id = movies.id
    JOIN
      actors ON actors.id = castings.actor_id
    WHERE
      actors.name = 'Harrison Ford'
  SQL
end

def ford_supporting_films
  # List the films where 'Harrison Ford' has appeared - but not in the star
  # role. [Note: the ord field of casting gives the position of the actor. If
  # ord=1 then this actor is in the starring role]
  execute(<<-SQL)
    SELECT
      movies.title
    FROM
      movies
    JOIN
      castings ON castings.movie_id = movies.id
    JOIN
      actors ON actors.id = castings.actor_id
    WHERE
      actors.name = 'Harrison Ford' AND
      castings.ord != 1
  SQL
end

def films_and_stars_from_sixty_two
  # List the title and leading star of every 1962 film.
  execute(<<-SQL)
    SELECT
      movies.title,
      actors.name
    FROM
      movies
    JOIN
      castings ON castings.movie_id = movies.id
    JOIN
      actors ON actors.id = castings.actor_id
    WHERE
      movies.yr = 1962 AND
      castings.ord = 1
  SQL
end

def travoltas_busiest_years
  # Which were the busiest years for 'John Travolta'? Show the year and the
  # number of movies he made for any year in which he made at least 2 movies.
  execute(<<-SQL)
    SELECT
      movies.yr,
      COUNT(*)
    FROM
      movies
    JOIN
      castings ON castings.movie_id = movies.id
    JOIN
      actors ON actors.id = castings.actor_id
    WHERE
      actors.name = 'John Travolta'
    GROUP BY
      movies.yr
    HAVING
      COUNT(*) >= 2
  SQL
end

def andrews_films_and_leads
  # List the film title and the leading actor for all of the films 'Julie
  # Andrews' played in.
  execute(<<-SQL)
    SELECT
      movies.title,
      leading_actors.name
    FROM
      movies
    JOIN
      castings AS leading_castings ON leading_castings.movie_id = movies.id
    JOIN
      actors AS leading_actors ON leading_actors.id = leading_castings.actor_id
    JOIN
      castings ON castings.movie_id = movies.id
    JOIN
      actors ON actors.id = castings.actor_id
    WHERE
      actors.name = 'Julie Andrews' AND
      leading_castings.ord = 1
  SQL
end

def prolific_actors
  # Obtain a list in alphabetical order of actors who've had at least 15
  # starring roles.
  execute(<<-SQL)
    SELECT
      actors.name
    FROM
      actors
    JOIN
      castings ON castings.actor_id = actors.id
    WHERE
      castings.ord = 1
    GROUP BY
      actors.name
    HAVING
      COUNT(*) >= 15
    ORDER BY
      actors.name
  SQL
end

def films_by_cast_size
  # List the films released in the year 1978 ordered by the number of actors
  # in the cast (descending), then by title (ascending).
  execute(<<-SQL)
    SELECT
      movies.title,
      COUNT(*)
    FROM
      movies
    JOIN
      castings ON castings.movie_id = movies.id
    WHERE
      movies.yr = 1978
    GROUP BY
      movies.id
    ORDER BY
      COUNT(*) DESC,
      movies.title ASC
  SQL
end

def colleagues_of_garfunkel
  # List all the people who have played alongside 'Art Garfunkel'.
  execute(<<-SQL)
    SELECT
      DISTINCT actors.name
    FROM
      actors
    JOIN
      castings ON castings.actor_id = actors.id
    JOIN
      castings AS art_castings ON art_castings.movie_id = castings.movie_id
    JOIN
      actors AS art ON art.id = art_castings.actor_id
    WHERE
      art.name = 'Art Garfunkel' AND
      actors.name != 'Art Garfunkel'
  SQL
end
