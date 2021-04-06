require "colorize"

COLORS = {
  odd: :light_black,
  even: :blue,
  cursor: :green,
  selected: :red,
  valid_move: :red
}

class Display
  def initialize(board)
    @board = board
    @cursor = Cursor.new([0, 0], board)
  end

  def render
    selected_piece = cursor.selected_piece
    valid_moves = selected_piece.valid_moves

    string = "    #{('A'..'H').to_a.join("  ")}    \n".light_black.on_white

    @board.rows.each_with_index do |row, row_index|
      string += " #{(8 - row_index).to_s} ".light_black.on_white
      row.each_with_index do |piece, col_index|
        if piece == selected_piece
          piece_color = COLORS[:selected]
        else
          piece_color = piece.color
        end

        pos = [row_index, col_index]

        if pos == @cursor.cursor_pos
          tile_color = COLORS[:cursor]
        elsif valid_moves.include?(pos)
          tile_color = COLORS[:valid_move]
        elsif pos.sum.even?
          tile_color = COLORS[:even]
        else
          tile_color = COLORS[:odd]
        end
        
        string += " #{piece} ".colorize(color: piece_color, background: tile_color)
      end
      string += " #{(8 - row_index).to_s} \n".light_black.on_white
    end
    string += "    #{('A'..'H').to_a.join("  ")}    \n".light_black.on_white

    system("clear")
    puts string
  end

  attr_reader :cursor
end