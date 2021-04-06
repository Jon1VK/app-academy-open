require "deck"

describe Deck do
  subject(:deck) { Deck.new }

  describe "#draw_card" do
    it "returns a card" do
      expect(deck.draw_card).to be_a(Card)
    end

    it "returns 52 different cards" do
      cards = []
      52.times { cards << deck.draw_card }
      expect(cards.uniq).to eq(cards)
    end

    it "returns nil on the 53rd draw" do
      52.times { deck.draw_card}
      expect(deck.draw_card).to be nil
    end
  end

  describe "#shuffle!" do
    let(:another_deck) { Deck.new }

    it "#draw returns random cards after #shuffle! has been called" do
      cards, other_cards = [], []
      deck.shuffle!
      another_deck.shuffle!
      52.times do
        cards << deck.draw_card
        other_cards << another_deck.draw_card
      end
      expect(cards <=> other_cards).to_not eq(0)
    end
  end
end