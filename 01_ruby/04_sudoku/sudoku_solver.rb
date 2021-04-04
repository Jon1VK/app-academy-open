require_relative "board.rb"

class Sudoku_Solver
  def initialize(file)
    @board = Board.from_file(file)    
  end

  def solve
    position = @board.empty_positions.first
    
    (1..9).each do |value|
      @board[position] = value

      if @board.solved?
        @board.render
        exit(0)
      elsif !@board.colliding_position?(position)
        solve
      end
    end

    @board[position] = 0
  end
end

if __FILE__ == $PROGRAM_NAME
  Sudoku_Solver.new(*ARGV).solve
end