require 'colorize'

class Tile
  VALID_VALUES = (0..9).to_a

  attr_reader :value

  def initialize(value, immutable)
    @value = value
    @immutable = immutable
  end

  def empty?
    @value == 0
  end

  def immutable?
    @immutable
  end

  def value=(value)
    @value = value if !@immutable && VALID_VALUES.include?(value)
  end

  def to_s
    return " ".to_s.green.on_white.underline if empty?
    @immutable ? @value.to_s.black.on_white.underline : @value.to_s.green.on_white.underline
  end

  def ==(tile)
    tile.value == @value
  end

  def hash
    @value.hash
  end

  def eql?(object)
    object.is_a?(Tile) &&
      object.value == @value
  end
end