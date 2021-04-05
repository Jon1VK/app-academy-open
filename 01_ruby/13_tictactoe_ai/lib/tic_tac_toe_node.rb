require_relative 'tic_tac_toe'

class TicTacToeNode
  attr_reader :board, :next_mover_mark, :prev_move_pos

  def initialize(board, next_mover_mark, prev_move_pos = nil)
    @board = board
    @next_mover_mark = next_mover_mark
    @prev_move_pos = prev_move_pos
  end

  def losing_node?(evaluator)
    if board.over?
      return !board.tied? && board.winner != evaluator
    end

    if next_mover_mark == evaluator
      return children.all? { |node| node.losing_node?(evaluator) }
    else
      return children.any? { |node| node.losing_node?(evaluator) }
    end
  end

  def winning_node?(evaluator)
    if board.over?
      return board.winner == evaluator
    end

    if next_mover_mark == evaluator
      return children.any? { |node| node.winning_node?(evaluator) }
    else
      return children.all? { |node| node.winning_node?(evaluator) }
    end
  end

  # This method generates an array of all moves that can be made after
  # the current move.
  def children
    child_nodes = []

    (0..2).each do |row|
      (0..2).each do |col|
        pos = [row, col]

        if board.empty?(pos)
          child_board = board.dup
          child_board[pos] = next_mover_mark

          child_mark = next_mover_mark == :x ? :o : :x

          child_node = self.class.new(child_board, child_mark, pos)

          child_nodes << child_node
        end
      end
    end

    child_nodes
  end
end
