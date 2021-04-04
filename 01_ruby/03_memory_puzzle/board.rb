require_relative 'card.rb'

class Board
  FACE_VALUES = ('a'..'z').to_a + ('A'..'Z').to_a

  def initialize(grid_width)
    populate(grid_width)
  end

  def populate(grid_width)
    grid_width = [
      2 * Math.sqrt(FACE_VALUES.length / 2).floor,
      grid_width - grid_width % 2
    ].min

    face_values = FACE_VALUES
      .shuffle[0...grid_width ** 2 / 2]

    cards = (face_values * 2)
      .map { |face_value| Card.new(face_value) }

    @grid = cards
      .shuffle
      .each_slice(grid_width)
      .to_a
  end

  def render
    str = " "
    (0...@grid.length).each_with_index { |i| str += " #{i}" }
    str += "\n"

    @grid.each_with_index do |row, i|
      str += "#{i}"
      row.each do |card|
        str += " #{card.to_s}"
      end
     str += "\n"
    end
    puts str
  end

  def won?
    @grid.all? { |row| row.all?(&:face_up) }
  end

  def face_down_positions
    positions = []

    (0...@grid.length).each_with_index do |row|
      (0...@grid.length).each_with_index do |col|
        card = @grid[row][col]
        positions << [row, col] if !card.face_up
      end
    end

    return positions
  end

  def reveal(position)
    row, col = position

    return if !row || !col || 
              row < 0 || row > @grid.length ||
              col < 0 || col > @grid.length
    
    card = @grid[row][col]

    if !card.face_up
      card.flip
      return card
    end
  end
end