require_relative "dictionary.rb"
require_relative "player.rb"
require_relative "ai_player.rb"

class Game
  DICTIONARY_FILE = "dictionary.txt"
  LOSE_WORD = :GHOST

  attr_reader :dictionary, :fragment

  def initialize(number_of_ai_players, *players)
    @dictionary = Dictionary.new(File.readlines(DICTIONARY_FILE).map(&:chomp))

    @players = players.map { |name| Player.new(name) }

    number_of_ai_players.to_i.times do |i| 
      @players << AI_Player.new((i + 1).to_s, @dictionary)
    end

    @players.shuffle!

    @losses = @players.map { |player| [player, 0] }.to_h

    @fragment = ""
  end

  def current_player
    @players.first
  end

  def previous_player
    @players.last
  end

  def next_player!
    @players.rotate!
    current_player
  end

  def someone_won?
    @players.length == 1
  end

  def play
    play_round until someone_won?

    puts "\nPlayer #{current_player.name} won the game."
  end

  def play_round
    @fragment = ""
    loser = nil

    until loser
      take_turn(next_player!)

      if @dictionary.include?(@fragment)
        puts "\nThere is a word #{@fragment} in a dictionary."
        puts "Player #{previous_player.name} lost the round."
        loser = previous_player
      elsif !@dictionary.any_word_start_with?(@fragment)
        puts "\nThere are no words in a dictionary that start with #{@fragment}."
        puts "Player #{current_player.name} lost the round."
        loser = current_player
      end
    end

    update_losses(loser)
    display_standings
  end

  def take_turn(player)
    puts "\nCurrent fragment: #{@fragment}"
    @fragment += player.guess_character(@fragment, @players.length)
  end

  def update_losses(loser)
    @losses[loser] += 1

    if @losses[loser] >= 5
      @players.delete(loser)
    end
  end

  def print_record(player)
    puts "Player #{player.name}: #{LOSE_WORD[0...@losses[player]]}"
  end

  def display_standings
    puts "\nSTANDINGS"
    @losses.keys.each { |player| print_record(player) }
  end
end

if __FILE__ == $PROGRAM_NAME
  if ARGV.length == 0
    raise "Invalid number of given arguments (expected 1+)"
  end
    Game.new(*ARGV).play
end