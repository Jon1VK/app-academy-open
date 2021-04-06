class InvalidMoveError < StandardError
  def initialize
    super("You can't move the selected piece to the selected position")
  end
end