# Big O-ctopus and Biggest Fish
# A Very Hungry Octopus wants to eat the longest fish in an array of fish.

fishes = ['fish', 'fiiish', 'fiiiiish', 'fiiiish', 'fffish', 'ffiiiiisshh', 'fsh', 'fiiiissshhhhhh']
# => "fiiiissshhhhhh"

# Sluggish Octopus
# Find the longest fish in O(n^2) time. Do this by comparing all fish lengths to all other fish lengths
def sluggish_octopus(fishes)
  fishes.each do |fish|
    return fish if fishes.all? { |another_fish| fish.length >= another_fish.length }
  end
end

# Dominant Octopus
# Find the longest fish in O(n log n) time. Hint: You saw a sorting algorithm that runs in O(n log n) in the Sorting Complexity Demo. Remember that Big O is classified by the dominant term.
def dominant_octopus(fishes)
  merge_sort(fishes) { |fish1, fish2| fish1.length <=> fish2.length }.last
end

def merge_sort (array, &prc)
  return array if array.length <= 1

  mid_idx = array.length / 2
  merge(
    merge_sort(array.take(mid_idx), &prc),
    merge_sort(array.drop(mid_idx), &prc),
    &prc
  )
end

def merge(left, right, &prc)
  merged_array = []
  prc = Proc.new { |num1, num2| num1 <=> num2 } unless block_given?
  until left.empty? || right.empty?
    case prc.call(left.first, right.first)
    when -1
      merged_array << left.shift
    when 0
      merged_array << left.shift
    when 1
      merged_array << right.shift
    end
  end

  merged_array + left + right
end

# Clever Octopus
# Find the longest fish in O(n) time. The octopus can hold on to the longest fish that you have found so far while stepping through the array only once.
def clever_octopus(fishes)
  longest = fishes.first
  fishes.each do |fish|
    longest = fish if fish.length > longest.length
  end
  longest
end

# Dancing Octopus
# Full of fish, the Octopus attempts Dance Dance Revolution. The game has tiles in the following directions:

tiles_array = ["up", "right-up", "right", "right-down", "down", "left-down", "left",  "left-up" ]
# To play the game, the octopus must step on a tile with her corresponding tentacle. We can assume that the octopus's eight tentacles are numbered and correspond to the tile direction indices.

# Slow Dance
# Given a tile direction, iterate through a tiles array to return the tentacle number (tile index) the octopus must move. This should take O(n) time.
def slow_dance(direction, tile_directions)
  tile_directions.each_with_index do |tile_direction, index|
    return index if tile_direction == direction
  end
end

# p slow_dance("up", tiles_array)
# # > 0
# p slow_dance("right-down", tiles_array)
# # > 3

new_tiles_data_structure = tiles_array.map.with_index { |dir, index| [dir, index] }.to_h

# Constant Dance!
# Now that the octopus is warmed up, let's help her dance faster. Use a different data structure and write a new function so that you can access the tentacle number in O(1) time.
def fast_dance(direction, tile_directions)
  tile_directions[direction]
end

# p fast_dance("up", new_tiles_data_structure)
# # > 0
# p fast_dance("right-down", new_tiles_data_structure)
# # > 3
