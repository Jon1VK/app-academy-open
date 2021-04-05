class Board
  attr_accessor :cups

  def initialize(name1, name2)
    @name1 = name1
    @name2 = name2
    @cups = Array.new(14) { [] }
    place_stones
  end

  def place_stones
    # helper method to #initialize every non-store cup with four stones each
    4.times do
      (0..5).each { |index| @cups[index] << :stone }
      (7..12).each { |index| @cups[index] << :stone }
    end
  end

  def valid_move?(start_pos)
    unless start_pos.between?(0, 5) || start_pos.between?(7, 12)
      raise "Invalid starting cup" 
    end

    if @cups[start_pos].empty?
      raise "Starting cup is empty"
    end
  end

  def make_move(start_pos, current_player_name)
    opponent_store_index = @name1 == current_player_name ? 13 : 6

    start_cup = @cups[start_pos]
    pos = start_pos

    until start_cup.empty?
      pos = (pos + 1) % 14

      next if pos == opponent_store_index

      @cups[pos] << start_cup.pop
    end

    render
    next_turn(pos)
  end

  def next_turn(ending_cup_idx)
    # helper method to determine whether #make_move returns :switch, :prompt, or ending_cup_idx
    if ending_cup_idx % 7 == 6
      return :prompt
    elsif @cups[ending_cup_idx].length == 1
      return :switch
    else
      return ending_cup_idx
    end
  end

  def render
    print "      #{@cups[7..12].reverse.map { |cup| cup.count }}      \n"
    puts "#{@cups[13].count} -------------------------- #{@cups[6].count}"
    print "      #{@cups.take(6).map { |cup| cup.count }}      \n"
    puts ""
    puts ""
  end

  def one_side_empty?
    @cups[0..5].all? { |cup| cup.empty? } ||
    @cups[7..12].all? { |cup| cup.empty? }
  end

  def winner
    case @cups[6].count <=> @cups[13].count
    when 1
      @name1
    when -1
      @name2
    when 0
      :draw
    end
  end
end
