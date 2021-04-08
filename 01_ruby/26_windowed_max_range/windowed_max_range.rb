# Phase 1: Naive Solution
def naive_windowed_max_range(array, window_size)
  current_max_range = 0
  (0..array.length - window_size).each do |idx|
    window = array[idx...idx + window_size]
    window_range = window.max - window.min
    current_max_range = window_range if window_range > current_max_range
  end
  current_max_range
end

# Phase 2: MyQueue
class MyQueue
  def initialize
    @store = []
  end

  def size
    @store.length
  end

  def peek
    @store.first
  end

  def empty?
    @store.empty?
  end

  def enqueue(item)
    @store.push(item)
    item
  end

  def dequeue
    @store.shift
  end
end

# Phase 3: MyStack
class MyStack
  def initialize
    @store = []
  end

  def size
    @store.length
  end

  def peek
    @store.last
  end

  def empty?
    size == 0
  end

  def push(item)
    @store.push(item)
    item
  end

  def pop
    @store.pop
  end
end

# Phase 4: StackQueue
class StackQueue
  def initialize
    @enqueue_stack = MyStack.new
    @dequeue_stack = MyStack.new
  end

  def size
    @enqueue_stack.size + @dequeue_stack.size
  end

  def empty?
    size == 0
  end

  def enqueue(item)
    @enqueue_stack.push(item)
  end

  def dequeue(item)
    if @dequeue_stack.empty?
      @dequeue_stack.push(@enqueue_stack.pop) until @enqueue_stack.empty?
    end

    @dequeue_stack.pop
  end
end

# Phase 5: MinMaxStack
class MinMaxStack
  def initialize
    @store = []
    @min_indices = MyStack.new
    @max_indices = MyStack.new
  end

  def size
    @store.length
  end

  def empty?
    size == 0
  end

  def peek
    @store.last
  end

  def max
    @store[@max_indices.peek] unless empty?
  end

  def min
    @store[@min_indices.peek] unless empty?
  end

  def push(value)
    @min_indices.push(@store.length) if min.nil? || value < min
    @max_indices.push(@store.length) if max.nil? || value > max
    @store.push(value)
    value
  end

  def pop
    return nil if empty?

    value = @store.pop
    @min_indices.pop if @store.length <= @min_indices.peek
    @max_indices.pop if @store.length <= @max_indices.peek
    value
  end
end

# Phase 6: MinMaxStackQueue
class MinMaxStackQueue
  def initialize
    @enqueue_stack = MinMaxStack.new
    @dequeue_stack = MinMaxStack.new
  end

  def size
    @enqueue_stack.size + @dequeue_stack.size
  end

  def empty?
    size == 0
  end

  def enqueue(item)
    @enqueue_stack.push(item)
  end

  def dequeue
    if @dequeue_stack.empty?
      @dequeue_stack.push(@enqueue_stack.pop) until @enqueue_stack.empty?
    end

    @dequeue_stack.pop
  end

  def min
    return nil if empty?
    return @enqueue_stack.min if @dequeue_stack.empty?
    return @dequeue_stack.min if @enqueue_stack.empty?
    [@enqueue_stack.min, @dequeue_stack.min].min
  end

  def max
    return nil if empty?
    return @enqueue_stack.max if @dequeue_stack.empty?
    return @dequeue_stack.max if @enqueue_stack.empty?
    [@enqueue_stack.max, @dequeue_stack.max].max
  end
end

# Phase 7: Max Windowed Range
def windowed_max_range(array, window_size)
  queue = MinMaxStackQueue.new
  current_max_range = 0
  array.each do |value|
    queue.enqueue(value)
    next if queue.size < window_size
    window_range = queue.max - queue.min
    current_max_range = window_range if window_range > current_max_range
    queue.dequeue
  end
  current_max_range
end

# p windowed_max_range([1, 0, 2, 5, 4, 8], 2) == 4 # 4, 8
# p windowed_max_range([1, 0, 2, 5, 4, 8], 3) == 5 # 0, 2, 5
# p windowed_max_range([1, 0, 2, 5, 4, 8], 4) == 6 # 2, 5, 4, 8
# p windowed_max_range([1, 3, 2, 5, 4, 8], 5) == 6 # 3, 2, 5, 4, 8
