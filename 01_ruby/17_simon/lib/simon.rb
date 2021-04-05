require 'colorize'

class Simon
  COLORS = %w(red blue green yellow)

  attr_accessor :sequence_length, :game_over, :seq

  def initialize
    @sequence_length = 1
    @game_over = false
    @seq = []
  end

  def play
    take_turn until @game_over

    clear_system
    puts game_over_message
    reset_game
  end

  def take_turn
    clear_system
    sleep(1)

    show_sequence
    require_sequence

    unless game_over
      clear_system
      puts round_success_message
      @sequence_length += 1
      sleep(1)
    end
  end

  def show_sequence
    add_random_color

    clear_system
    @seq.each do |color|
      puts color.upcase.colorize(color.to_sym)
      sleep(1)
      clear_system
      sleep(0.25)
    end
  end

  def require_sequence
    puts "Enter first character of the colors one by one on a newline"
    @seq.each do |color|
      guess = gets.chomp.downcase
      unless color[0] == guess
        @game_over = true
        break
      end
    end
  end

  def add_random_color
    @seq << COLORS.sample
  end

  def round_success_message
    "Correct!"
  end

  def game_over_message
    "Game over. You managed to survive #{@sequence_length - 1} rounds"
  end

  def reset_game
    @sequence_length = 1
    @game_over = false
    @seq = []
  end

  def clear_system
    system "clear"
    puts "ROUND #{@sequence_length}"
  end
end
