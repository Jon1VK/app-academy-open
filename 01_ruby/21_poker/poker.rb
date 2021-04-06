require_relative "lib/player"
require_relative "lib/round"

class Poker
  def initialize(entry_fee, big_blind, *players)
    @big_blind = big_blind
    @players = players.map { |name| Player.new(name, entry_fee) }
  end

  def play
    until game_over?
      play_round
      change_dealer
      remove_bankrupt_players
    end

    puts "#{@players.first.name} won the game with a pot of #{@players.first.money}"
  end

  private

  def game_over?
    @players.length <= 1
  end

  def play_round
    Round.new(@players.dup, @big_blind).play
  end

  def change_dealer
    @players.rotate!
  end

  def remove_bankrupt_players
    @players.select!(&:has_money?)
  end
end

if __FILE__ == $PROGRAM_NAME
  entry_fee, big_blind, *players = ARGV
  Poker.new(entry_fee.to_i, big_blind.to_i, *players).play
end