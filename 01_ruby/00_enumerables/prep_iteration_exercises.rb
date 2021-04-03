# ### Factors
# Write a method `factors(num)` that returns an array containing all the factors of a given number.

def factors(num)
  (1..num).select { |f| num % f == 0 }
end


# ### Bubble Sort
# Implement Bubble sort in a method, `Array#bubble_sort!`. Your method should modify the array so that it is in sorted order.
# After writing `bubble_sort!`, write a `bubble_sort` that does the same but doesn't modify the original. Do this in two lines using `dup`.
# Finally, modify your `Array#bubble_sort!` method so that, instead of using `>` and `<` to compare elements, it takes a block to perform the comparison.

class Array
  def bubble_sort!(&prc)
    prc ||= Proc.new { |x, y| x <=> y }

    sorted = false
    sorted_idx = self.length

    while !sorted
      sorted = true

      (1...sorted_idx).each do |i|
        if prc.call(self[i-1], self[i]) == 1
          sorted = false
          self[i-1], self[i] = self[i], self[i-1]
          sorted_idx = i
        end
      end
    end
    self
  end

  def bubble_sort(&prc)
    self.dup.bubble_sort!(&prc)
  end
end


# ### Substrings and Subwords
# Write a method, `substrings`, that will take a `String` and return an array containing each of its substrings. Don't repeat substrings.
# Your `substrings` method returns many strings that are not true English words.
# Let's write a new method, `subwords`, which will call `substrings`, filtering it to return only valid words.
# To do this, `subwords` will accept both a string and a dictionary (an array of words).

def substrings(string)
  subs = {}
  (0...string.length).each do |i|
    (i...string.length).each do |j|
      subs[string[i..j]] = true
    end
  end
  subs.keys
end

def subwords(word, dictionary)
  substrings(word).select { |word| dictionary.include?(word) }
end


# ### Doubler
# Write a `doubler` method that takes an array of integers and returns an array with the original elements multiplied by two.

def doubler(array)
  array.map { |el| el * 2 }
end


# ### My Each
# Extend the Array class to include a method named `my_each` that takes a block, calls the block on every element of the array, and then returns the original array. Do not use Enumerable's `each` method.

class Array
  def my_each(&prc)
    i = 0
    while i < self.length
      prc.call(self[i])
      i += 1
    end
    self
  end
end


# ### My Enumerable Methods
# Implement new `Array` methods `my_map` and `my_select`. Use your `my_each` method.
# Implement a `my_inject` method. Again, use your `my_each` to define 'my_inject`.

class Array
  def my_map(&prc)
    new_arr = []
    self.my_each { |el| new_arr << prc.call(el) }
    new_arr
  end

  def my_select(&prc)
    new_arr = []
    self.my_each { |el| new_arr << el if prc.call(el) }
    new_arr
  end

  def my_inject(&blk)
    result = nil
    self.my_each do |el|
      if !result
        result = el
      else
        result = blk.call(result, el)
      end
    end
    result
  end
end

# ### Concatenate
# Create a method that takes in an `Array` of `String`s and uses `inject` to return the concatenation of the strings.

def concatenate(strings)
  strings.inject(&:+)
end
