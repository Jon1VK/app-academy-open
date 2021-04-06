class Queen < Piece
  include Slideable

  def symbol
    "♛"
  end

  protected

  def move_dirs
    HORIZONTAL_DIRS + DIAGONAL_DIRS
  end
end