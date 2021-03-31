class GuessingGame
    def initialize(min, max)
        @secret_num = rand(min..max)
        @num_attempts = 0
        @game_over = false
    end

    attr_reader :num_attempts

    def game_over?
        @game_over
    end

    def check_num(n)
        @num_attempts += 1
        if n == @secret_num
            @game_over = true
            puts 'you win'
        elsif n < @secret_num
            puts 'too small'
        else
            puts 'too big'
        end
    end

    def ask_user
        puts 'enter a number'
        check_num(gets.chomp.to_i)
    end
end
