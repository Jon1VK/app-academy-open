class Board
    def initialize(n)
        @grid = Array.new(n) { Array.new(n, '_') }
    end

    def valid?(pos)
        pos.all? { |coordinate| coordinate.between?(0, @grid.length - 1) }
    end

    def empty?(pos)
        row, col = *pos
        @grid[row][col] == '_'
    end

    def place_mark(pos, mark)
        raise 'Invalid position' if !self.valid?(pos)
        raise 'Position not empty' if !self.empty?(pos)

        row, col = *pos
        @grid[row][col] = mark
    end

    def print
        board = ""
        @grid.each do |row|
            row.each do |mark|
                board += "|#{mark}"
            end
            board += "|\n"
        end
        puts board
    end

    def win_row?(mark)
        @grid.any? { |row| row.all? { |row_mark| row_mark == mark } }
    end

    def win_col?(mark)
        @grid.transpose.any? { |col| col.all? { |col_mark| col_mark == mark } }
    end

    def win_diagonal?(mark)
        diagonals = [[], []]

        (0...@grid.length).each do |i|
            diagonals.first << @grid[i][i]
            diagonals.last << @grid[i][-1-i]
        end

        diagonals.any? { |diagonal| diagonal.all? { |diagonal_mark| diagonal_mark == mark } }
    end

    def win?(mark)
        win_row?(mark) || win_col?(mark) || win_diagonal?(mark)
    end

    def empty_positions?
        @grid.any? { |row| row.any? { |mark| mark == "_" } }
    end

    def legal_positions
        positions = []
        (0...@grid.length).each do |row|
            (0...@grid.length).each do |col|
                pos = [row, col]
                positions << pos if empty?(pos)
            end
        end
        positions
    end
end
