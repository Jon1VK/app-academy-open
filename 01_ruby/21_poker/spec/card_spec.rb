require "card"

describe Card do
  subject(:card) { Card.new(:hearts, 9) }

  describe "#rank" do
    it "returns rank of a card" do
      expect(card.rank).to eq(9)
    end
  end

  describe "#suit" do
    it "returns suit of a card" do
      expect(card.suit).to eq(:hearts)
    end
  end

  describe "#<=>(card)" do
    let(:lower_card) { Card.new(:clubs, 3) }
    let(:higher_card) { Card.new(:diamonds, 12) }
    let(:same_rank_card) { Card.new(:spades, 9 ) }

    it "returns 1 when another card's rank is lower" do
      expect(card <=> lower_card).to eq(1)
    end

    it "returns -1 when another card's rank is higher" do
      expect(card <=> higher_card).to eq(-1)
    end

    it "returns 0 when another card's rank is same" do
      expect(card <=> same_rank_card).to eq(0)
    end
  end
end