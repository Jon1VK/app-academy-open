require_relative 'board.rb'
require_relative 'players.rb'

class Game
  def initialize(grid_width, computer)
    @board = Board.new(grid_width)
    @player = computer ? 
      ComputerPlayer.new(grid_width) : HumanPlayer.new(grid_width)
    @previous_guess = nil
  end

  def play
    until @board.won?
      system("clear")
      @board.render
      @player.prompt
      make_guess(@player.get_input(@board.face_down_positions))
    end
  end

  def make_guess(position)
    card = @board.reveal(position)

    return if !card

    @player.receive_revealed_card(card.face_value, position)
      
    if !@previous_guess
      @previous_guess = {position: position, card: card}
      return
    end

    system("clear")
    @board.render

    if card != @previous_guess[:card]
      puts "It's not a match!"
      card.flip
      @previous_guess[:card].flip
    else
      puts "It's a match!"
    end

    sleep(1)
    @previous_guess = nil
  end
end

if $PROGRAM_NAME == __FILE__
  grid_width = ARGV[0] || 4
  computer = ARGV[1] == "true"
  
  Game.new(grid_width.to_i, computer).play
end