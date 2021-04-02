class HumanPlayer
    attr_reader :mark

    def initialize(mark)
        @mark = mark
    end

    def get_position(legal_positions)
        while true
            puts "Player #{@mark}, enter a position as two numbers in the format `row col`"
            pos = gets.chomp.split.map(&:to_i)
            return pos if legal_positions.include?(pos)
            puts "Invalid position"
        end
        pos
    end
end
