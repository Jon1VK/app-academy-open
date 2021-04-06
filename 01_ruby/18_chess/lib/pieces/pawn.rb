class Pawn < Piece
  def symbol
    "♟"
  end

  def moves
    forward_steps + side_attacks
  end

  private

  def at_start_row?
    (self.color == :white && self.pos.first == 6) ||
    (self.color == :black && self.pos.first == 1)
  end

  def forward_dir
    self.color == :black ? 1 : -1
  end

  def forward_steps
    row, col = self.pos

    steps = [ [row + forward_dir, col] ]
    steps << [row + 2 * forward_dir, col] if at_start_row?

    steps.select do |move_pos|
      self.board.valid_pos?(move_pos) &&
      self.board[move_pos].empty?
    end
  end

  def side_attacks
    row, col = self.pos

    attack_positions = [
      [row + forward_dir, col - 1],
      [row + forward_dir, col + 1]
    ]

    attack_positions.reject do |move_pos|
      !self.board.valid_pos?(move_pos) ||
      self.board[move_pos].empty? ||
      self.board[move_pos].color == self.color
    end
  end
end