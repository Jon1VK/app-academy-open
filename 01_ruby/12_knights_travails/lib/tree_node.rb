require_relative "queue"

class PolyTreeNode
  attr_reader :value, :parent, :children

  def initialize(value)
    @value = value
    @parent = nil
    @children = []
  end

  def parent=(node)
    if @parent
      @parent.children.delete(self)
    end

    @parent = node

    if node && !node.has_child?(self)
      node.children.push(self)
    end
  end

  def add_child(child)
    if !has_child?(child)
      child.parent = self
    end
  end

  def remove_child(child)
    if !has_child?(child)
      raise "Given node #{child} is not a child of #{self}"
    end
    
    child.parent = nil
  end

  def has_child?(node)
    @children.include?(node)
  end

  def dfs(value)
    if @value == value
      return self
    end

    @children.each do |child|
      search_result = child.dfs(value)
      return search_result if search_result
    end

    nil
  end

  def bfs(value)
    queue = Queue.new
    queue.enqueue(self)

    until queue.empty?
      node = queue.dequeue

      return node if node.value == value

      node.children.each do |child|
        queue.enqueue(child)
      end
    end

    nil
  end

  def inspect
    @value.inspect
  end
end