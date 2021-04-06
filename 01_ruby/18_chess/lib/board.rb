class Board
  def initialize
    @rows = Array.new(8) { Array.new(8) { NullPiece.instance } }
    add_pieces
  end

  def [](pos)
    row, col = pos
    rows[row][col]
  end

  def []=(pos, piece)
    row, col = pos
    rows[row][col] = piece
  end

  def valid_pos?(pos)
    row, col = pos
    row.between?(0, 7) && col.between?(0, 7)
  end

  def move_piece(color, start_pos, end_pos)
    piece = self[start_pos]

    raise NullPieceError.new if piece.is_a?(NullPiece)
    raise OpponentPieceError.new unless piece.color == color
    raise InvalidMoveError.new unless piece.valid_moves.include?(end_pos)

    self[start_pos] = NullPiece.instance
    self[end_pos] = piece
    piece.pos = end_pos
  end

  def move_piece!(start_pos, end_pos)
    piece = self[start_pos]
    self[start_pos] = NullPiece.instance
    self[end_pos] = piece
    piece.pos = end_pos
  end

  def add_piece(piece, pos)
    self[pos] = piece
  end

  def in_check?(color)
    king = find_king(color)
    opponent_pieces = pieces.select { |piece| piece.color != color }
    opponent_pieces.any? { |piece| piece.moves.include?(king.pos) }
  end

  def checkmate?(color)
    player_pieces = pieces.select { |piece| piece.color == color }

    in_check?(color) &&
    player_pieces.all? { |piece| piece.valid_moves.empty? }
  end

  def find_king(color)
    pieces.detect { |piece| piece.is_a?(King) && piece.color == color }
  end

  def pieces
    rows.flatten.reject(&:empty?)
  end

  def dup
    dup_board = Board.new

    rows.each_with_index do |row, row_index|
      row.each_with_index do |piece, col_index|
        dup_pos = [row_index, col_index]

        if piece.empty?
          dup_piece = piece.class.instance
        else
          dup_piece = piece.class.new(piece.color, dup_board, dup_pos)
        end

        dup_board.add_piece(dup_piece, dup_pos)
      end
    end

    dup_board
  end

  attr_reader :rows

  private

  def add_pieces
    add_piece( King.new( :white, self, [7, 4] ), [7,4] )
    add_piece( King.new( :black, self, [0, 4] ), [0,4] )

    add_piece( Queen.new( :white, self, [7, 3] ), [7,3] )
    add_piece( Queen.new( :black, self, [0, 3] ), [0,3] )

    add_piece( Bishop.new( :white, self, [7, 2] ), [7,2] )
    add_piece( Bishop.new( :white, self, [7, 5] ), [7,5] )
    add_piece( Bishop.new( :black, self, [0, 2] ), [0,2] )
    add_piece( Bishop.new( :black, self, [0, 5] ), [0,5] )

    add_piece( Knight.new( :white, self, [7, 1] ), [7,1] )
    add_piece( Knight.new( :white, self, [7, 6] ), [7,6] )
    add_piece( Knight.new( :black, self, [0, 1] ), [0,1] )
    add_piece( Knight.new( :black, self, [0, 6] ), [0,6] )

    add_piece( Rook.new( :white, self, [7, 0] ), [7,0] )
    add_piece( Rook.new( :white, self, [7, 7] ), [7,7] )
    add_piece( Rook.new( :black, self, [0, 0] ), [0,0] )
    add_piece( Rook.new( :black, self, [0, 7] ), [0,7] )

    8.times do |col|
      add_piece( Pawn.new( :white, self, [6, col] ), [6, col] )
      add_piece( Pawn.new( :black, self, [1, col] ), [1, col] )
    end
  end
end