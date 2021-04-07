# my_min
# Given a list of integers find the smallest number in the list.
def slower_my_min(numbers)
  numbers.each do |number|
    return number if numbers.all? { |another_number| number <= another_number }
  end
end

def faster_my_min(numbers)
  min = numbers.first
  numbers.each do |number|
    min = number if number < min
  end
  min
end

# Largest Contiguous Sub-sum
# You have an array of integers and you want to find the largest contiguous (together in sequence) sub-sum. Find the sums of all contiguous sub-arrays and return the max.
def slower_largest_contiguous_subsum(numbers)
  sub_arrays(numbers).map(&:sum).max
end

def largest_contiguous_subsum(numbers)
  largest_sum = numbers.first
  current_sum = 0

  numbers.each do |number|
    current_sum = 0 if current_sum < 0
    current_sum += number

    if current_sum > largest_sum
      largest_sum = current_sum
    end
  end

  largest_sum
end

def sub_arrays(array)
  subs = []
  (0...array.length).each do |start_idx|
    (start_idx...array.length).each do |end_idx|
      subs << array[start_idx..end_idx]
    end
  end
  subs
end