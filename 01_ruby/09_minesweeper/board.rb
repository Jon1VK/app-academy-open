require "colorize"
require_relative "tile"
require_relative "bomb"

class Board
  def self.grid_of_tiles(rows, cols)
    Array.new(rows) do |row| 
      Array.new(cols) do |col|
        Tile.new([row, col])
      end
    end
  end

  def initialize(rows, cols, bombs)
    @grid = Board.grid_of_tiles(rows, cols)
    place_bombs(bombs)
  end

  def solved?
    @grid.all? do |row|
      row.all? do |tile|
        tile.is_a?(Bomb) || tile.revealed?
      end
    end
  end

  def place_bombs(bombs)
    random_positions(bombs).each do |position|
      self[position] = Bomb.new(position)
    end
    update_bomb_counts
  end

  def update_bomb_counts
    @grid.each do |row|
      row.each do |tile|
        tile.bomb_count = bomb_count(tile)
      end
    end
  end

  def bomb_count(tile)
    neighbor_tiles(tile).count do |tile|
      tile.is_a?(Bomb)
    end
  end

  def neighbor_tiles(tile)
    tile.neighbor_positions.map do |position|
      self[position]
    end.reject(&:nil?)
  end

  def toggle_flag(position)
    tile = self[position]
    return tile if tile.revealed?
    tile.toggle_flag
  end

  def reveal(position)
    tile = self[position]
    return if tile.revealed? || tile.flagged?

    tile.reveal
    if !tile.has_neighbor_bombs?
      neighbor_tiles(tile).each do |neighbor_tile|
        reveal(neighbor_tile.position)
      end
    end
    tile
  end

  def reveal_all
    @grid.each do |row|
      row.each do |tile|
        tile.reveal
      end
    end
  end

  def [](position)
    row, col = position
    return nil if !row.between?(0, rows - 1) || !col.between?(0, cols - 1)
    @grid[row][col]
  end

  def []=(position, tile)
    row, col = position
    @grid[row][col] = tile
  end

  def rows
    @grid.length
  end

  def cols
    @grid.first.length
  end

  def grid_positions
    positions = []
    rows.times do |row|
      cols.times do |col|
        positions << [row, col]
      end
    end
    positions
  end

  def unrevealed_positions
    grid_positions.reject do |position|
      self[position].revealed?
    end
  end

  def random_positions(n)
    grid_positions.sample(n)
  end

  def to_s
    string = cols.times.inject("".ljust(3)) do |str, i|
      if i < 10
        str + "  "
      else
        str + " #{i / 10}"
      end
    end

    string = cols.times.inject(string + "\n" + "".ljust(3)) do |str, i|
      str + " #{i % 10}"
    end

    @grid.each_with_index.inject(string + "\n") do |str, (row, row_index)|
      str + row.inject("#{row_index} ".rjust(3)) do |row_string, tile|
        row_string + "|".black.on_white + tile.to_s
      end + "|".black.on_white + "\n"
    end
  end
end