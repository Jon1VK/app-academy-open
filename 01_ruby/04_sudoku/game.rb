require_relative 'board.rb'

class Sudoku
  def initialize(file)
    @board = Board.from_file(file)
  end

  def play
    until @board.solved?
      system("clear")
      @board.render
      position = get_position
      value = get_value

      @board[position] = value
    end

    system("clear")
    @board.render
    puts "You have solved the Sudoku"
  end

  def get_position
    valid_positions = @board.mutable_positions

    position = nil
    until valid_positions.include?(position)
      print "Enter the position ('row col') you would like to update: "
      position = STDIN.gets.chomp.split.map(&:to_i)
    end
    position
  end

  def get_value
    value = nil
    until Tile::VALID_VALUES.include?(value)
      print "Enter the new value: "
      value = STDIN.gets.chomp.to_i
    end
    value
  end
end

if $PROGRAM_NAME == __FILE__
  Sudoku.new(*ARGV).play
end