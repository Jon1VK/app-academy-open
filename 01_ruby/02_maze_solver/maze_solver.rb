require_relative "maze.rb"

class Maze_Solver
  def initialize(blueprint)
    @maze = Maze.new(blueprint)
    @open_nodes = {
      @maze.start_node => @maze.start_node.distance(@maze.end_node)
    }
    @closed_nodes = []
  end

  def solve!
    until self.maze_solved? || self.maze_unsolvable?
      current_node = @open_nodes.keys.min { |node| @open_nodes[node] }

      @maze.walkable_adjacent_nodes(current_node)
        .reject { |node| @closed_nodes.include?(node) }
        .each do |node|
          path_cost = calculate_cost_through(current_node, node)
          
          if !@open_nodes.has_key?(node) || path_cost < @open_nodes[node]
            node.parent_node = current_node
            @open_nodes[node] = path_cost
          end
        end
      
      @open_nodes.delete(current_node)
      @closed_nodes.push(current_node)
    end

    if maze_solved?
      @maze.mark_path!
      puts @maze
    else
      raise "There is no possible path from start point to end point."
    end
  end

  def calculate_cost_through(node_1, node_2)
    @open_nodes[node_1] + node_1.distance(node_2) + node_2.distance(@maze.end_node)
  end

  def maze_solved?
    @closed_nodes.include?(@maze.end_node)
  end

  def maze_unsolvable?
    @open_nodes.empty?
  end
end

if __FILE__ == $PROGRAM_NAME
  Maze_Solver.new(*ARGV).solve!
end