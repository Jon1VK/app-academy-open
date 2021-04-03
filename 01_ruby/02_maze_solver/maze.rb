require_relative "maze_node.rb"

class Maze
  attr_reader :start_node, :end_node

  def initialize(blueprint)
    @maze_nodes = File.readlines(blueprint).map.with_index do |row, row_index|
      row.chomp.split('').map.with_index do |value, col_index|
        position = [row_index, col_index]

        case value
        when ' '
          Maze_Node.new(position, true)
        when '*'
          Maze_Node.new(position, false)
        when 'S'
          @start_node = Start_Node.new(position)
        when 'E'
          @end_node = End_Node.new(position)
        else
          raise "Unknown value #{value} on the blueprint of the maze."
        end
      end
    end

    raise "There was no starting point 'S' on the blueprint of the maze." if !@start_node
    raise "There was no ending point 'E' on the blueprint of the maze." if !@end_node
  end

  def adjacent_nodes(node)
    possible_nodes = node.adjacent_positions.map do |position|
      row, col = position
      @maze_nodes[row][col]
    end

    possible_nodes.select { |node| node != nil }
  end

  def walkable_adjacent_nodes(node)
    self.adjacent_nodes(node).select(&:walkable)
  end

  def to_s
    @maze_nodes.inject('') do |string, row|
      string + row.inject('') do |row_string, maze_node|
        row_string + maze_node.map_mark
      end + "\n"
    end
  end

  def mark_path!
    current_node = @end_node.parent_node

    while(current_node.parent_node)
      row, col = current_node.position
      @maze_nodes[row][col] = Path_Node.new([row, col])
      current_node = current_node.parent_node
    end
  end
end