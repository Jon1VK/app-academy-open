require 'set'

class String
  def hamming_distance(string)
    return nil if self.length != string.length

    self.each_char.with_index.count { |c, i| c != string[i] }
  end
end

class WordChainer
  def initialize(dictionary_file_name)
    @dictionary = Set.new(File.read(dictionary_file_name).split)
    @current_words = []
    @seen_words = {}
  end

  def run(source, target)
    return nil if source.length != target.length

    @current_words = [source]
    @seen_words[source] = nil

    until @current_words.empty? || @seen_words.keys.include?(target)
      self.explore_words
    end

    build_path(target)
  end

  def adjacent_words(word)
    @dictionary.select do |d_word| 
      d_word.length == word.length && word.hamming_distance(d_word) == 1
    end
  end

  def explore_words
    new_current_words = []

    @current_words.each do |current_word|
      adjacent_words(current_word).each do |adjacent_word|
        next if @seen_words.keys.include?(adjacent_word)

        new_current_words << adjacent_word
        @seen_words[adjacent_word] = current_word
      end
    end

    @current_words = new_current_words
  end

  def build_path(target)
    path = [target]
    current_word = target
    next_word = @seen_words[current_word]

    return nil if !next_word

    while next_word
      path.unshift(next_word)
      current_word = next_word
      next_word = @seen_words[current_word]
    end

    path
  end
end

if $PROGRAM_NAME == __FILE__
  WordChainer.new('dictionary.txt').run(ARGV[0], ARGV[1]).each do |word|
    puts word
  end
end