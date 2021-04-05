require_relative 'tic_tac_toe_node'

class SuperComputerPlayer < ComputerPlayer
  def move(game, mark)
    node = TicTacToeNode.new(game.board, mark)
    child_nodes = node.children.shuffle

    child_nodes.each do |node|
      return node.prev_move_pos if node.winning_node?(mark)
    end

    child_nodes.each do |node|
      return node.prev_move_pos if !node.losing_node?(mark)
    end

    raise "Player must be cheating, since SuperComputerPlayer cannot be beaten!"
  end
end

if __FILE__ == $PROGRAM_NAME
  puts "Play the brilliant computer!"
  hp = HumanPlayer.new("Jeff")
  cp = SuperComputerPlayer.new

  TicTacToe.new(hp, cp).run
end
