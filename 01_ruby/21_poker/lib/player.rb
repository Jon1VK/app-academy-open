COMMANDS = {
  'c' => :check,
  'f' => :fold,
  'r' => :raise,
  'a' => :all_in
}

class Player
  attr_reader :name, :money

  def initialize(name, money)
    @name = name
    @money = money
  end

  def has_money?
    @money > 0
  end

  def bet(value)
    value = [value, @money].min
    @money -= value
    value
  end

  def bet_all
    bet(@money)
  end

  def pay(value)
    @money += value
  end

  def get_command
    puts "\nCommands: 'c' for check, 'f' for fold, 'r' for raise, 'a' for all-in"
    print "Enter a command: "
    command = COMMANDS[STDIN.gets.chomp]
    raise "Invalide command" if command.nil?
    command
  end

  def get_raise
    print "Enter a raise: "
    bet_raise = STDIN.gets.chomp.to_i
    raise "Bet raise must be greater than zero" unless bet_raise > 0
    bet_raise
  end

  def get_swap_positions
    valid_chars = ",12345"
    print "\nEnter at most three card numbers (separated by commas), that you would like to swap: "
    input = STDIN.gets.chomp
    raise "Invalid characters in input" unless input.chars.all? { |char| valid_chars.include?(char) }
    positions = input.split(',').map(&:to_i)
    raise "Too many card numbers" unless positions.length <= 3
    raise "Invalid card number" unless positions.all? { |pos| pos.between?(1, 5) }
    positions.map { |pos| pos - 1 }
  end
end