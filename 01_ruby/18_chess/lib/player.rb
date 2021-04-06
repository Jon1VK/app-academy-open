class Player
  def initialize(color, display)
    @color = color
    @display = display
  end

  attr_reader :color

  def make_move(board)
    start_pos = get_pos("Select piece you would like to move")

    raise NullPieceError.new if board[start_pos].empty?
    raise OpponentPieceError.new if board[start_pos].color != color

    end_pos = get_pos("Select position where you would like to move the selected piece")

    board.move_piece(@color, start_pos, end_pos)
  rescue NullPieceError, OpponentPieceError, InvalidMoveError => error
    @display.cursor.select_null
    @display.render
    puts error.message
    retry
  ensure
    @display.cursor.select_null
  end

  def get_pos(prompt)
    pos = nil

    while pos.nil?
      puts prompt
      pos = @display.cursor.get_input
      @display.render
    end

    pos
  end
end