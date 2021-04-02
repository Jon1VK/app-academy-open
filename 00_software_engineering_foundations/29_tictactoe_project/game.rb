require_relative 'board'
require_relative 'human_player'
require_relative 'computer_player'

class Game
    def initialize(board_size, players)
        @players = players.map { |mark, computer| computer ? ComputerPlayer.new(mark) : HumanPlayer.new(mark) }
        @board = Board.new(board_size)
    end

    def current_player
        @players.first
    end

    def switch_turn
        @players.rotate!
        @players.first
    end

    def play
        while @board.empty_positions?
            @board.print

            pos = current_player.get_position(@board.legal_positions)
            @board.place_mark(pos, current_player.mark)

            if @board.win?(current_player.mark)
                puts "Player #{current_player.mark} won!"
                @board.print
                return
            end

            switch_turn
        end

        puts "It's a draw!"
        @board.print
    end
end
