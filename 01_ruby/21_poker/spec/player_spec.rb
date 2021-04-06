require "player"

describe Player do
  subject(:player) { Player.new("Joni", 50) }

  describe "#name" do
    it "returns player's name" do
      expect(player.name).to eq("Joni")
    end
  end

  describe "#money" do
    it "returns player's money" do
      expect(player.money).to eq(50)
    end
  end

  describe "#bet(value)" do
    context "when value is less than player's money" do
      it "removes value from player's money" do
        player.bet(20)
        expect(player.money).to eq(30)
      end

      it "returns value" do
        expect(player.bet(20)).to eq(20)
      end
    end

    context "when value is more than player's money" do
      it "removes all money from player's money" do
        player.bet(60)
        expect(player.money).to eq(0)
      end

      it "returns all money of the player" do
        expect(player.bet(60)).to eq(50)
      end
    end
  end

  describe "#bet_all" do
    it "calls #bet(value) with all of player's money" do
      expect(player).to receive(:bet).with(player.money)
      player.bet_all
    end
  end

  describe "#pay(value)" do
    it "adds value to player's money" do
      player.pay(20)
      expect(player.money).to eq(70)
    end
  end
end