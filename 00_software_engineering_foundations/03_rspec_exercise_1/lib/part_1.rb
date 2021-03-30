def average(num_1, num_2)
    (num_1 + num_2) / 2.0
end

def average_array(nums)
    1.0 * nums.sum / nums.length
end

def repeat(str, num)
    str * num
end

def yell(str)
    str.upcase + '!'
end

def alternating_case(sentence)
    sentence.split.map.with_index { |word, i| i % 2 == 0 ? word.upcase : word.downcase }.join(' ')
end