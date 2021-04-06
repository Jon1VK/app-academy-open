class Piece
  def initialize(color, board, pos)
    @color = color
    @board = board
    @pos = pos
  end

  def to_s
    symbol
  end

  def empty?
    self.is_a?(NullPiece)
  end

  def valid_moves
    moves.reject { |move_pos| move_into_check?(move_pos) }
  end

  # Subclasses should implement this
  def symbol
  end

  attr_accessor :pos
  attr_reader :color, :board

  private
  def move_into_check?(end_pos)
    dup_board = board.dup
    dup_board.move_piece!(pos, end_pos)
    dup_board.in_check?(color)
  end
end