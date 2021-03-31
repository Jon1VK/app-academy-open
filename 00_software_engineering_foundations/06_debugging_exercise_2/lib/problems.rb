# Run `bundle exec rspec` and satisy the specs.
# You should implement your methods in this file.
# Feel free to use the debugger when you get stuck.

def is_prime?(n)
    return false if n < 2

    (2..Math.sqrt(n)).each do |d|
        return false if n % d == 0
    end

    return true
end

def largest_prime_factor(n)
    (2..n).reverse_each do |d|
        return d if n % d == 0 && is_prime?(d)
    end

    return 1
end

def unique_chars?(str)
    str.chars.uniq == str.chars
end

def dupe_indices(arr)
    indices = Hash.new { |h,k| h[k] = Array.new }

    arr.each_with_index do |el, i|
        indices[el] << i
    end

    indices.select { |k,v| v.length > 1 }
end

def ana_array(arr_1, arr_2)
    arr_1 - arr_2 == [] && arr_2 - arr_1 == []
end
