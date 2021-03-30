def hipsterfy(str)
    vowels = 'aeiou'
    (0...str.length).reverse_each do |i|
        if vowels.include?(str[i])
            str[i] = ''
            return str
        end
    end
    return str
end

def vowel_counts(str)
    counts = Hash.new { |h, k| h[k] = 0 }
    str.each_char { |char| counts[char.downcase] += 1 }
    return counts
end

def caesar_cipher(msg, n)
    alphabet = ('a'..'z').to_a
    msg.each_char.with_index do |char, i|
        if alphabet.include?(char)
            char_index = (alphabet.index(char) + n) % alphabet.length
            msg[i] = alphabet[char_index]
        end
    end
    return msg
end