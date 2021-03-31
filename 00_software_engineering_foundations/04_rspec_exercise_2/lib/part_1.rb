def partition(arr, n)
    left = arr.select { |num| num < n }
    right = arr.select { |num| num >= n }
    [left, right]
end

def merge(hash_1, hash_2)
    hash_1.merge(hash_2)
end

def censor(sentence, words)
    sentence.split.map do |word|
        if words.include?(word.downcase)
            word.tr('aeiouAEIOU', '*')
        else
            word
        end
    end.join(' ')
end

def power_of_two?(n)
    while n % 2 == 0
        n /= 2
    end

    n == 1 ? true : false
end