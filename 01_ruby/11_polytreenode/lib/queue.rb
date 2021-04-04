class Queue
  def initialize
    @queue = []
  end

  def enqueue(el)
    @queue.push(el)
    el
  end

  def dequeue
    @queue.shift
  end

  def peek
    @queue.first
  end

  def empty?
    @queue.empty?
  end
end