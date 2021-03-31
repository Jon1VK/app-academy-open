class Board
    def self.print_grid(grid)
        grid.each { |row| puts row.join(' ') }
    end

    attr_reader :size

    def initialize(n)
        @grid = Array.new(n) { Array.new(n, :N) }
        @size = n * n
    end

    def [](pos)
        row, col = *pos
        @grid[row][col]
    end

    def []=(pos, value)
        row, col = *pos
        @grid[row][col] = value
    end

    def num_ships
        @grid.sum { |row| row.count { |mark| mark == :S } }
    end

    def attack(pos)
        if self[pos] == :S
            self[pos] = :H
            puts 'you sunk my battleship!'
            true
        else
            self[pos] = :X
            false
        end
    end

    def place_random_ships
        while num_ships < 0.25 * size
            pos = [rand(@grid.length), rand(@grid.length)]
            self[pos] = :S
        end
    end

    def hidden_ships_grid
        @grid.map { |row| row.map { |mark| mark == :S ? :N : mark } }
    end

    def cheat
        Board.print_grid(@grid)
    end

    def print
        Board.print_grid(hidden_ships_grid)
    end
end
