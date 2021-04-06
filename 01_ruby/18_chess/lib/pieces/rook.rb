class Rook < Piece
  include Slideable

  def symbol
    "♜"
  end

  protected

  def move_dirs
    HORIZONTAL_DIRS
  end
end