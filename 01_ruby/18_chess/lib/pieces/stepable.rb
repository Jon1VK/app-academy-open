module Stepable
  def moves
    row, col = self.pos

    all_moves = move_diffs.map do |(row_diff, col_diff)|
      [row + row_diff, col + col_diff]
    end

    all_moves.reject do |move_pos|
      !self.board.valid_pos?(move_pos) ||
      self.board[move_pos].color == self.color
    end
  end

  private
  
  # Subclass must implement this
  def move_diffs
  end
end