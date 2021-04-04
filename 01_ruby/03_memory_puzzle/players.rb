class ComputerPlayer
  def initialize(grid_width)
    @grid_width = grid_width
    @known_cards = Hash.new { |h, k| h[k] = [] }
  end

  def prompt
    return
  end
  
  def get_input(face_down_positions)
    known_pairs = @known_cards.values.select { |positions| positions.length == 2 }

    if !known_pairs.empty?
      return known_pairs[0].shift
    end

    return (face_down_positions - @known_cards.values.flatten(1)).sample
  end

  def receive_revealed_card(face_value, position)
    if !@known_cards[face_value].include?(position)
      @known_cards[face_value] << position
    end
  end
end

class HumanPlayer < ComputerPlayer
  def prompt
    print "Enter the position of the card you would like to flip: "
  end

  def get_input(face_down_positions)
    STDIN.gets.chomp.split.map(&:to_i)
  end
end