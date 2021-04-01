def proper_factors(n)
    (1...n).select { |f| n % f == 0 }
end

def aliquot_sum(n)
    proper_factors(n).sum
end

def perfect_number?(n)
    n == aliquot_sum(n)
end

def ideal_numbers(n)
    nums = []
    num = 1

    while nums.length < n
        nums << num if perfect_number?(num)
        num += 1
    end
    nums
end