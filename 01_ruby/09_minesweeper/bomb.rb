require_relative "tile"

class Bomb < Tile
  def initialize(position)
    super(position)
  end

  def to_s
    if revealed?
      "✜".black.on_white.underline
    else
      super.to_s
    end
  end
end