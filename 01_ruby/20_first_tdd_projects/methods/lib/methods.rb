def my_uniq(arr)
  raise ArgumentError.new("testi") unless arr.is_a?(Array)

  new_arr = []
  arr.each { |el| new_arr << el unless new_arr.include?(el) }
  new_arr
end

class Array
  def two_sum
    indicies = []

    self.length.times do |first|
      (first + 1...self.length).each do |second|
        indicies << [first, second] if self[first] + self[second] == 0
      end
    end

    indicies
  end
end

def my_transpose(rows)
  cols = []
  rows.length.times do |col|
    column = []
    rows.length.times do |row|
      column << rows[row][col]
    end
    cols << column
  end
  cols
end

def stock_picker(prices)
  price_diffs = {}

  prices.length.times do |day_1|
    (day_1 + 1...prices.length).each do |day_2|
      price_diffs[[day_1, day_2]] = prices[day_2] - prices[day_1]
    end
  end

  price_diffs.max_by { |days, diff| diff }.first
end