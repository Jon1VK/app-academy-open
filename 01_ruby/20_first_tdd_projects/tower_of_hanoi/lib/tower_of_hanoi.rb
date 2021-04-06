class TowerOfHanoi
  attr_reader :piles

  def initialize(size)
    @piles = Array.new(3) { [] }
    size.times { |i| piles.first << i }
  end

  def play
    until won?
      render
      print "Enter the pile from which you want to move a disk: "
      move_from = gets.chomp.to_i
      print "Enter the pile to which you want to move a disk: "
      move_to = gets.chomp.to_i

      move(move_from, move_to)
    end
  end

  def move(from, to)
    @piles[to].push(@piles[from].pop) if valid_move?(from, to)
  end

  def valid_move?(from, to)
    return false if @piles[from].empty?
    return true if @piles[to].empty?
    @piles[from].last > @piles[to].last
  end

  def won?
    @piles[0..1].all?(&:empty?)
  end

  def render
    piles.each_with_index do |pile, index|
      print index.to_s + " "
      p pile
    end
  end
end

if __FILE__ == $PROGRAM_NAME
  TowerOfHanoi.new(3).play
end