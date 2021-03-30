# Write a method, compress_str(str), that accepts a string as an arg.
# The method should return a new str where streaks of consecutive characters are compressed.
# For example "aaabbc" is compressed to "3a2bc".

def compress_str(str)
    count = 0
    curr_c = str[0]
    compressed = ''

    str.chars.each do |char|
        if char == curr_c
            count += 1
        else
            compressed += count.to_s if count > 1
            compressed += curr_c
            count = 1
            curr_c = char
        end
    end

    compressed += compressed += count.to_s if count > 1
    compressed += curr_c
end

p compress_str("aaabbc")        # => "3a2bc"
p compress_str("xxyyyyzz")      # => "2x4y2z"
p compress_str("qqqqq")         # => "5q"
p compress_str("mississippi")   # => "mi2si2si2pi"
