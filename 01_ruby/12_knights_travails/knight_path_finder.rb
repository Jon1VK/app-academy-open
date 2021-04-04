require_relative "lib/tree_node"
require_relative "lib/queue"

class KnightPathFinder
  def self.valid_moves(pos)
    row, col = pos
    [
      [row - 1, col + 2],
      [row - 1, col - 2],
      [row + 1, col + 2],
      [row + 1, col - 2],
      [row - 2, col - 1],
      [row - 2, col + 1],
      [row + 2, col - 1],
      [row + 2, col + 1]
  ].select { |(row, col)| row.between?(0,7) && col.between?(0,7) }
  end

  def initialize(start_pos)
    @root_node = PolyTreeNode.new(start_pos)
    @considered_positions = [start_pos]
    build_move_tree
  end

  def build_move_tree
    queue = Queue.new
    queue.enqueue(@root_node)

    until queue.empty?
      node = queue.dequeue

      new_moves(node.value).each do |pos|
        new_node = PolyTreeNode.new(pos)
        new_node.parent = node
        queue.enqueue(new_node)
      end
    end
  end

  def find_path(end_pos)
    @end_node = @root_node.dfs(end_pos)
    trace_path_back(@end_node)
  end

  def trace_path_back(node)
    path = [node]

    until node.parent == nil
      path.unshift(node.parent)
      node = node.parent
    end

    path
  end

  def new_moves(pos)
    moves = KnightPathFinder.valid_moves(pos).reject do |pos|
      @considered_positions.include?(pos)
    end

    @considered_positions += moves

    moves
  end
end