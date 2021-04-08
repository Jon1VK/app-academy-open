class LRUCache
  def initialize(capacity)
    @capacity = capacity
    @cache = []
  end

  def count
    # returns number of elements currently in cache
    @cache.length
  end

  def add(el)
    # adds element to cache according to LRU principle
    @cache.delete(el)
    @cache.shift if count >= @capacity
    @cache.push(el)
  end

  def show
    # shows the items in the cache, with the LRU item first
    @cache.each { |item| p item }
  end
end
