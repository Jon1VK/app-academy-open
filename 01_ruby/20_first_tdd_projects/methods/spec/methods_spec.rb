require 'methods'

describe "my_uniq" do
  context "when given argument is not an array" do
    it "should raise an error" do
      expect { my_uniq("foo") }.to raise_error(ArgumentError)
    end
  end

  context "when the original array is empty" do
    it "returns an empty array" do
      expect(my_uniq([])).to eq([])
    end
  end

  context "when the original array has no duplicates" do
    it "returns the original array" do
      expect(my_uniq([1,2,3])).to eq([1,2,3])
    end
  end

  context "when the original array has duplicates" do
    it "returns the unique elements in the order in which they first appeared" do
      expect(my_uniq([1,2,3,3,2,2,5])).to eq([1,2,3,5])
    end
  end
end

describe Array do
  describe "#two_sum" do
    context "when there is no pairs that sums up to 0" do
      it "returns an empty array" do
        expect([1,2,-3,-4,0].two_sum).to eq([])
      end
    end

    context "when there is pairs that sums up to 0" do
      it "returns the indexes of the pairs" do
        expect([-1,0,2,-2,1,-1].two_sum).to eq([[0,4],[2,3],[4,5]])
      end
    end
  end
end

describe "my_transpose" do
  it "should return a transpose of a square matrix" do
    expect(my_transpose([
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8]
    ])).to eq([
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8]
    ])
  end
end

describe "stock_picker" do
  it "should return pair of days, when price growth is the biggest" do
    expect(stock_picker([5, 7, 4, 7, 8, 10, 1])).to eq([2, 5])
  end
end