class Map
  def initialize
    @map = []
  end

  def set(key, value)
    index = index_of(key)

    if index
      @map[index][1] = value
    else
      @map << [key, value]
    end

    value
  end

  def get(key)
    index = index_of(key)
    @map[index].last if index
  end

  def delete(key)
    index = index_of(key)
    @map.delete_at(index).last if index
  end

  def show
    @map.dup
  end

  private

  def index_of(key)
    @map.index { |(k, v)| k == key }
  end
end