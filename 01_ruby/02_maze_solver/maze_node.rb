class Maze_Node
  attr_accessor :parent_node
  attr_reader :position, :walkable, :map_mark

  def initialize(position, walkable)
    @position = position
    @walkable = walkable
    @parent_node = nil
    @map_mark = walkable ? ' ' : '*'
  end

  def distance(node)
    row_1, col_1, row_2, col_2 = @position + node.position

    Math.sqrt( (row_2 - row_1) ** 2 + (col_2 - col_1) ** 2 )
  end

  def adjacent_positions
    row, col = position

    [
      [row, col - 1],
      [row, col + 1],
      [row - 1, col],
      [row + 1, col]
    ]
  end
end

class Start_Node < Maze_Node
  def initialize(position)
    super(position, true)
    @map_mark = 'S'
  end
end

class End_Node < Maze_Node
  def initialize(position)
    super(position, true)
    @map_mark = 'E'
  end
end

class Path_Node < Maze_Node
  def initialize(position)
    super(position, true)
    @map_mark = 'X'
  end
end