require_relative "card"

class Deck
  def self.shuffled_deck
    deck = Deck.new
    deck.shuffle!
    deck
  end

  def initialize
    @cards = []
    Card::SUITS.each do |suit|
      (2..14).each { |rank| @cards << Card.new(suit, rank) }
    end
  end

  def shuffle!
    @cards.shuffle!
    nil
  end

  def draw_card
    @cards.pop
  end
end