require_relative "lib/game_files"

class Game
  def initialize
    @board = Board.new
    @display = Display.new(@board)
    @players = [Player.new(:white, @display), Player.new(:black, @display)]
  end

  def play
    until game_over?
      @display.render
      current_player.make_move(@board)
      swap_turn!
    end

    @display.render
    puts "The winner is player with #{previous_player.color} pieces"
  end

  def current_player
    @players.first
  end

  def previous_player
    @players.last
  end

  private

  def swap_turn!
    @players.rotate!
  end

  def game_over?
    @board.checkmate?(current_player.color)
  end
end

if __FILE__ == $PROGRAM_NAME
  Game.new.play
end