require "hand"

describe Hand do
  subject(:hand) { Hand.new }
  let(:card) { double("card") }
  let(:another_card) { double("card") }

  before(:each) { hand.instance_variable_set(:@cards, [card]) }

  describe "#[](pos)" do
    it "returns card from a given pos" do
      expect(hand[0]).to be card
    end
  end

  describe "#<<(card)" do
    it "adds a card to a hand" do
      hand << another_card
      expect(hand[1]).to be another_card
    end
  end

  describe "#[](pos, card)" do
    it "swaps card from a given pos to another card" do
      hand[0] = another_card
      expect(hand[0]).to be another_card
    end
  end

  describe "#<=>(hand)" do
    subject(:two_pair) { Hand.new }
    let(:straight_flush) { Hand.new }

    before(:each) do
      allow(straight_flush).to receive(:rank).and_return(:straight_flush)
      allow(two_pair).to receive(:rank).and_return(:two_pair)
    end

    it "returns 1 when another hand's rank is weaker" do
      expect(straight_flush <=> two_pair).to eq(1)
    end

    it "returns -1 when another hand's rank is stronger" do
      expect(two_pair <=> straight_flush).to eq(-1)
    end

    context "when another hand's rank is same" do
      let(:better_two_pair) { Hand.new }

      before(:each) do
        allow(better_two_pair).to receive(:rank).and_return(:two_pair)
        [2,2,4,4,14].each do |rank|
          two_pair << double(:suit => :hearts, :rank => rank)
        end
        [3,3,4,4,6].each do |rank|
          better_two_pair << double(:suit => :hearts, :rank => rank)
        end
      end

      it "returns 1 when another hand is worse" do
        expect(better_two_pair <=> two_pair).to eq(1)
      end

      it "returns -1 when another hand is better" do
        expect(two_pair <=> better_two_pair).to eq(-1)
      end

      it "return 0 when hands are equally strong" do
        expect(two_pair <=> two_pair).to eq(0)
      end
    end
  end
end