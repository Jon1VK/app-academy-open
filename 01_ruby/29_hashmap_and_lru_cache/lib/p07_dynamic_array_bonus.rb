class StaticArray
  attr_reader :store

  def initialize(capacity)
    @store = Array.new(capacity)
  end

  def [](i)
    validate!(i)
    self.store[i]
  end

  def []=(i, val)
    validate!(i)
    self.store[i] = val
  end

  def length
    self.store.length
  end

  private

  def validate!(i)
    raise "Overflow error" unless i.between?(0, self.store.length - 1)
  end
end

class DynamicArray
  include Enumerable

  attr_accessor :count

  def initialize(capacity = 8)
    @store = StaticArray.new(capacity)
    @count = 0
    @start_idx = 0
  end

  def [](i)
    @store[position(i)] if i.between?(-@count, @count - 1)
  end

  def []=(i, val)
    raise IndexError.new("index #{i} too small for array; minimum: #{-@count}") if i < -@count
    push nil until @count > i
    @store[position(i)] = val
  end

  def capacity
    @store.length
  end

  def include?(val)
    self.any? { |ele| ele == val }
  end

  def push(val)
    resize! if @count == capacity
    @store[end_idx] = val
    @count += 1
  end

  def unshift(val)
    resize! if @count == capacity
    @start_idx = (@start_idx - 1) % capacity
    @store[@start_idx] = val
    @count += 1
  end

  def pop
    @count -= 1
    val = @store[end_idx]
    @store[end_idx] = nil
    val
  end

  def shift
    val = @store[@start_idx]
    @store[@start_idx] = nil
    @start_idx = (@start_idx + 1) % capacity
    @count -= 1
    val
  end

  def first
    @store[@start_idx]
  end

  def last
    @store[end_idx - 1]
  end

  def each(&prc)
    self.length.times do |idx|
      prc.call(self[idx])
    end
  end

  def to_s
    "[" + inject([]) { |acc, el| acc << el }.join(", ") + "]"
  end

  def ==(other)
    return false unless [Array, DynamicArray].include?(other.class)
    return false unless self.length == other.length
    self.each_with_index.all? { |ele, idx| ele == other[idx] }
  end

  alias_method :<<, :push
  [:length, :size].each { |method| alias_method method, :count }

  private

  def position(i)
    if i < 0
      (end_idx + i) % capacity
    else
      (@start_idx + i) % capacity
    end
  end

  def end_idx
    (@start_idx + @count) % capacity
  end

  def resize!
    new_store = StaticArray.new(capacity * 2)
    self.each_with_index { |val, idx| new_store[idx] = val }
    @store = new_store
    @start_idx = 0
  end
end
