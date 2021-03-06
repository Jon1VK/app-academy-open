class Knight < Piece
  include Stepable

  def symbol
    "♞"
  end

  protected
  
  def move_diffs
    [ [1, 2], [2, 1], [1, -2], [-2, 1], [-1, 2], [2, -1], [-1, -2], [-2, -1] ]
  end
end