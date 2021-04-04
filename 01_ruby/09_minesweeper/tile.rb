require "colorize"

class Tile
  attr_reader :position
  attr_writer :bomb_count

  def initialize(position)
    @position = position
    @bomb_count = 0
    @revealed = false
    @flagged = false
  end

  def revealed?
    @revealed
  end

  def reveal
      @revealed = true
  end

  def flagged?
    @flagged
  end

  def toggle_flag
    @flagged = !@flagged
  end

  def has_neighbor_bombs?
    @bomb_count != 0
  end

  def neighbor_positions
    tile_row, tile_col = @position
    positions = []
    (tile_row - 1..tile_row + 1).each do |row|
      (tile_col - 1..tile_col + 1).each do |col|
        positions << [row, col]
      end
    end
    positions
  end

  def to_s
    if @revealed
      case @bomb_count
      when 0
        " ".black.on_white.underline
      when 1
        @bomb_count.to_s.blue.on_white.underline
      when 2
        @bomb_count.to_s.green.on_white.underline
      when 3
        @bomb_count.to_s.red.on_white.underline
      when 4
        @bomb_count.to_s.magenta.on_white.underline
      when 5
        @bomb_count.to_s.blue.on_white.underline
      when 6
        @bomb_count.to_s.green.on_white.underline
      when 7
        @bomb_count.to_s.red.on_white.underline
      when 8
        @bomb_count.to_s.magenta.on_white.underline
      end
    elsif @flagged
      "⚑".red.on_white.underline
    else
      "*".black.on_white.underline
    end
  end
end