require "yaml"
require_relative "board"

class Minesweeper
  def self.from_save_file
    YAML.load(File.read("save.yml"))
  end

  def initialize(rows, cols, mines)
    @board = Board.new(rows, cols, mines)
  end

  def run
    until @board.solved?
      render_board
      play_round
    end
    render_board
    puts "You won!"
  end

  def play_round
    command, *position = get_input

    case command
    when "r"
      tile = @board.reveal(position)
    when "f"
      tile = @board.toggle_flag(position)
    when "s"
      File.open("save.yml", "w") { |file| file.write(self.to_yaml) }
      "Game was saved!"
      exit
    end

    if tile.is_a?(Bomb)
      @board.reveal_all
      render_board
      puts "You lost!"
      exit
    end
  end

  def get_input
    command = nil
    position = nil

    until command == "s" ||
        ((command == "r" || command == "f") &&
        @board.unrevealed_positions.include?(position))
      puts "\nCommands"
      puts "'r row col' for reveal"
      puts "'f row col' for flagging"
      puts "'s' for saving the game"
      print "Enter a command: "
      command, *position = STDIN.gets.chomp.split
      position.map!(&:to_i)
    end
    
    [command] + position
  end

  def render_board
    system("clear")
    puts @board.to_s
  end
end

if __FILE__ == $PROGRAM_NAME
  level, *args = ARGV

  case level
  when "easy"
    Minesweeper.new(9,9,10).run
  when "intermediate"
    Minesweeper.new(13,15,40).run
  when "hard"
    Minesweeper.new(16,30,99).run
  when "load"
    Minesweeper.from_save_file.run
  else
    Minesweeper.new(*args.map(&:to_i)).run
  end
end