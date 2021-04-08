class Integer
  # Integer#hash already implemented for you
end

class Array
  def hash
    self.each_with_index.sum { |ele, idx| ele.hash * idx.hash }
  end
end

class String
  def hash
    chars = ('a'..'z').to_a + ('A'..'Z').to_a
    self.chars.map { |char| chars.index(char) }.hash
  end
end

class Hash
  # This returns 0 because rspec will break if it returns nil
  # Make sure to implement an actual Hash#hash method
  def hash
    self.to_a.sort.hash
  end
end
