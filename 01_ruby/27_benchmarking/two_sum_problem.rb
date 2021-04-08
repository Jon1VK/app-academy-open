require 'benchmark'

# Brute force O(n^2)
def bad_two_sum?(arr, target_sum)
  (0...arr.length - 1).each do |idx_1|
    (idx_1 + 1...arr.length).each do |idx_2|
      return true if arr[idx_1] + arr[idx_2] == target_sum
    end
  end
  false
end

# Sorting O(nlogn)
def okay_two_sum?(arr, target_sum)
  sorted_arr = arr.sort
  start_idx = 0
  end_idx = arr.length - 1

  until start_idx == end_idx
    sum = sorted_arr[start_idx] + sorted_arr[end_idx]
    return true if sum == target_sum
    start_idx += 1 if sum < target_sum
    end_idx -= 1 if sum > target_sum
  end

  false
end

# Hash Map O(n)
def two_sum?(arr, target_sum)
  integers = Hash.new(false)
  arr.each { |num| integers[num] = true }
  
  arr.any? do |num|
    remainder = target_sum - num
    remainder != num && integers[remainder]
  end
end

def run_performance_tests
  arr = Array.new(10000) { rand(100) }

  Benchmark.bm(10) do |b|
    b.report("Force") { bad_two_sum?(arr, -1) }
    b.report("Sort") { okay_two_sum?(arr, -1) }
    b.report("Hashmap") { two_sum?(arr, -1) }
  end
end

run_performance_tests