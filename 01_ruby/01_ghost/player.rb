class Player
  attr_reader :name

  def initialize(name)
    @name = name
  end

  def guess_character(fragment, number_of_players)
    alpha = ('a'..'z').to_a

    character = ""
    until alpha.include?(character)
      print "#{name}, enter a character: "
      character = STDIN.gets.chomp.downcase
    end
    character
  end
end