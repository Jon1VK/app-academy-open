def palindrome?(str)
    (0...str.length / 2).all? do |i|
        str[i] == str[-1 - i]
    end
end

def substrings(str)
    subs = []

    (0...str.length).each do |i|
        (i...str.length).each do |j|
            subs << str[i..j]
        end
    end

    subs
end

def palindrome_substrings(str)
    substrings(str).select { |word| word.length > 1 && palindrome?(word) }
end