class NullPieceError < StandardError
  def initialize
    super("There is no piece on the board at the selected position")
  end
end