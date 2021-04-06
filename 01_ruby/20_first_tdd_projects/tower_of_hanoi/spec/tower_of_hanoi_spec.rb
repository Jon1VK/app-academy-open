require "tower_of_hanoi"

describe TowerOfHanoi do
  subject(:twh) { TowerOfHanoi.new(3) }

  describe "#initialize" do
    it "should set piles to an array of length three" do
      expect(twh.piles.length).to eq(3)
    end

    it "should set piles to an array containing arrays" do
      expect(twh.piles).to all(be_an(Array))
    end

    it "should set first pile to contain the disks" do
      expect(twh.piles.first).to eq([0, 1, 2])
    end

    it "should leave other than first pile empty" do
      expect(twh.piles[1..2]).to all(eq([]))
    end
  end

  describe "#valid_move?" do
    context "when move is valid" do
      it "returns true" do
        expect(twh.valid_move?(0, 2)).to be true
      end
    end

    context "when from pile is empty" do
      it "returns false" do
        expect(twh.valid_move?(1, 2)).to be false
      end
    end

    context "when move is invalid" do
      it "returns false" do
        twh.move(0, 1)
        expect(twh.valid_move?(0, 1)).to be false
      end
    end
  end

  describe "#move" do
    before(:each) do
      twh.move(0, 2)
      twh.move(0, 1)
    end

    context "when the move is valid" do
      it "moves disk from one pile to another pile" do
        expect(twh.piles).to eq([[0], [1], [2]])
      end
    end

    context "when the move is invalid" do
      it "does nothing" do
        twh.move(0, 2)
        expect(twh.piles).to eq([[0], [1], [2]])
      end
    end
  end

  describe "#won?" do
    before(:each) do
      twh.move(0,2)
      twh.move(0,1)
      twh.move(2,1)
      twh.move(0,2)
      twh.move(1,0)
      twh.move(1,2)
    end

    context "when player has not won" do
      it "returns false" do
        expect(twh.won?).to be false
      end
    end

    context "when player has won" do
      it "returns true" do
        twh.move(0,2)
        expect(twh.won?).to be true
      end
    end
  end
end