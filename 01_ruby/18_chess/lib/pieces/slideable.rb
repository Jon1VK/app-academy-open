module Slideable
  def moves
    move_dirs.inject([]) do |all_moves, (row_diff, col_diff)|
      all_moves + grow_unblocked_moves_in_dir(row_diff, col_diff)
    end
  end

  private

  HORIZONTAL_DIRS = [ [0, 1], [1, 0], [0, -1], [-1, 0] ]
  DIAGONAL_DIRS = [ [-1, -1], [-1, 1], [1, 1], [1, -1] ]

  # Subclass must implement this
  def move_dirs
  end

  def grow_unblocked_moves_in_dir(row_diff, col_diff)
    all_moves = []

    row, col = self.pos

    while true
      row += row_diff
      col += col_diff

      move_pos = [row, col]
      break unless self.board.valid_pos?(move_pos)

      piece_at_move_pos = self.board[move_pos]
      break if self.color == piece_at_move_pos.color

      all_moves << move_pos

      break unless piece_at_move_pos.empty?
    end

    all_moves
  end
end