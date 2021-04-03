require_relative "dictionary.rb"

class AI_Player
  attr_reader :name

  def initialize(name, dictionary)
    @name = "Computer #{name}"
    @dictionary = dictionary
  end

  def guess_character(fragment, number_of_players)
    alpha = ('a'..'z').to_a

    possible_characters = alpha.select do |character| 
      @dictionary.any_word_start_with?(fragment + character)
    end

    winning_probabilities = possible_characters.map do |character|
      [character, probability_of_win(fragment + character, number_of_players)]
    end

    guess = winning_probabilities.max_by do |character, winning_probability| 
      winning_probability
    end.first

    puts "#{@name} guessed character #{guess}"
    guess
  end

  def probability_of_win(fragment, number_of_players)
    possible_words = @dictionary.words_that_start_with(fragment)

    winning_words = possible_words.select do |word|
      (word.length - fragment.length) % number_of_players != 1
    end

    1.0 * winning_words.length / possible_words.length
  end
end