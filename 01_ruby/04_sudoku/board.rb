require_relative 'tile.rb'

class Board
  def self.from_file(file)
    grid = File.read(file).split.map do |row| 
      row.split('').map do |value|
        given = value != "0"
        Tile.new(value.to_i, given)
      end
    end

    Board.new(grid) 
  end

  def initialize(grid)
    @grid = grid
  end

  def [](position)
    row, col = position
    @grid[row][col]
  end

  def []=(position, value)
    self[position].value = value
  end

  def solved?
    colliding_positions.empty?
  end

  def mutable_positions
    positions = []
    @grid.each_with_index do |row, i|
      row.each_with_index do |tile, j|
        positions << [i, j] if !tile.immutable?
      end
    end
    positions
  end

  def colliding_positions
    mutable_positions.select do |position|
      colliding_position?(position)
    end
  end

  def empty_positions
    mutable_positions.select { |position| self[position].empty? }
  end

  def colliding_position?(position)
    tile = self[position]
    row = @grid[position.first]
    col = @grid.transpose[position.last]
    square = square_of(position)

    tile.empty? ||
      collision_of_tile(row, tile) ||
      collision_of_tile(col, tile) ||
      collision_of_tile(square, tile)
  end

  def collision_of_tile(tiles, tile)
    tile_count(tiles, tile) > 1
  end

  def tile_count(tiles, compare_tile)
    tiles.count { |tile| tile == compare_tile }
  end

  def square_of(position)
    row, col = position

    row_start = row - row % 3
    row_end = row_start + 3

    col_start = col - col % 3
    col_end = col_start + 3

    @grid[row_start...row_end].map do |row|
      row[col_start...col_end]
    end.flatten
  end

  def render
    collisions = colliding_positions

    str = "   0 1 2 3 4 5 6 7 8\n"
    @grid.each_with_index do |row, i|
      str += "#{i} " + "|".black.on_white.underline
      row.each_with_index do |tile, j|
        tile_str = tile.to_s
        if collisions.include?([i, j])
          tile_str = tile_str.red.on_white.underline
        end
        str += tile_str + "|".black.on_white.underline
      end
      str += "\n"
    end
    puts str += "\n"
  end
end