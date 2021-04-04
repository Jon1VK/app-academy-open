def range(a, b)
  return [] if b <= a
  [a] + range(a + 1, b)
end

def iterative_sum(array)
  array.inject { |sum, n| sum += n }
end

def recursive_sum(array)
  return nil if array.empty?
  return array[0] if array.length == 1
  array[0] + recursive_sum(array[1..-1])
end

def exp_1(b, n)
  return nil if n < 0
  return 1 if n == 0
  b * exp_1(b, n - 1)
end

def exp_2(b, n)
  return nil if n < 0
  return 1 if n == 0
  if n.even?
    tmp = exp_2(b, n / 2)
    return tmp * tmp
  else
    tmp = exp_2(b, (n-1)/2)
    return b * tmp * tmp
  end
end

class Array
  def self.merge(array_1, array_2)
    merged = []

    i, j = 0, 0
    a, b = array_1[0], array_2[0]

    while a && b
      if a <= b
        merged << a
        i += 1
        a = array_1[i]
      else
        merged << b
        j += 1
        b = array_2[j]
      end
    end

    return merged + array_2[j..-1] if !a
    return merged + array_1[i..-1] if !b
  end

  def deep_dup
    return [] if self.empty?
    self.map do |ele|
      if ele.is_a? Array
        ele.deep_dup
      else
        ele
      end
    end
  end

  def merge_sort
    return self.dup if self.length <= 1

    middle_index = self.length / 2
    sorted_left = self[0...middle_index].merge_sort
    sorted_right = self[middle_index..-1].merge_sort

    Array.merge(sorted_left, sorted_right)
  end

  def subsets
    return [[]] if self.empty?
    
    subarr_subsets = self[0...-1].subsets

    subarr_subsets + subarr_subsets.map { |subset| subset.dup << self[-1] }
  end

  def permutations
    return [[]] if self.empty?

    (0...self.length).inject([]) do |perms, i|
      dup_arr = self.dup
      dup_arr.delete_at(i)

      perms + dup_arr.permutations.map do |sub_perm|
        sub_perm.unshift(self[i])
      end
    end
  end
end

def recursive_fibonacci(n)
  return [] if n < 1
  return [0] if n == 1
  return [0, 1] if n == 2 
  sequence = recursive_fibonacci(n - 1)
  sequence << sequence[-2] + sequence[-1]
end

def iterative_fibonacci(n)
  return [] if n < 1
  return [0] if n == 1
  return [0, 1] if n == 2

  sequence = [0, 1]

  (n-2).times do
    sequence << sequence[-2] + sequence[-1]
  end

  sequence
end

def bsearch(array, target)
  return nil if array.empty?

  middle_index = array.length / 2
  middle_value = array[middle_index]

  if middle_value == target
    return middle_index
  elsif middle_value > target
    return bsearch(array[0...middle_index], target)
  else
    sub_index = bsearch(array[middle_index + 1..-1], target)
    return middle_index + 1 + sub_index if sub_index
  end
end

def greedy_make_change(amount, coins = [25, 10, 5, 1])
  return [] if amount == 0 || coins.empty?

  change = []
  sorted_coins = coins.sort
  biggest_coin = sorted_coins[-1]
  
  (amount / biggest_coin).times do
    change << biggest_coin
    amount -= biggest_coin
  end

  change + greedy_make_change(amount, sorted_coins[0...-1])
end

def make_better_change(amount, coins = [25, 10, 5, 1])
  possible_changes = []

  smaller_coins = coins.reject { |coin| coin > amount }

  return [] if smaller_coins.empty?

  smaller_coins.each do |coin|
    possible_changes << [coin] + make_better_change(amount - coin, smaller_coins)
  end

  possible_changes.reject { |changes| changes.sum != amount }
    .min { |a, b| a.length <=> b.length } || []
end