def element_count(arr)
    counts = Hash.new(0)
    arr.each { |ele| counts[ele] += 1 }
    counts
end

def char_replace!(str, hash)
    str.each_char.with_index { |c, i| str[i] = hash[c] if hash.has_key?(c) }
end

def product_inject(nums)
    nums.inject { |prod, num| prod * num }
end