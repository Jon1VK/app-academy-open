require 'set'

class Dictionary
  def initialize(words)
    @words = Set.new(words)
  end

  def include?(word)
    @words.include?(word)
  end

  def any_word_start_with?(string)
    @words.any? { |word| word.start_with?(string) }
  end

  def words_that_start_with(string)
    @words.select { |word| word.start_with?(string) }
  end
end