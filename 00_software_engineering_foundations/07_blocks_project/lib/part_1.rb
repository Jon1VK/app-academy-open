def select_even_nums(nums)
    nums.select { |num| num.even? }
end

def reject_puppies(dogs)
    dogs.reject { |dog| dog['age'] <= 2 }
end

def count_positive_subarrays(arrays)
    arrays.count { |array| array.sum > 0 }
end

def aba_translate(word)
    vowels = 'aeiou'
    word.chars.map do |char| 
        if vowels.include?(char.downcase)
            char + 'b' + char
        else
            char
        end
    end.join
end

def aba_array(words)
    words.map { |word| aba_translate(word) }
end