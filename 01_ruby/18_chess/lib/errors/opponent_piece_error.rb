class OpponentPieceError < StandardError
  def initialize
    super("You can't move opponent's pieces")
  end
end