# Phase I:
# Write a method #first_anagram? that will generate and store all the possible anagrams of the first string. Check if the second string is one of these.
def first_anagram?(str_1, str_2)
  str_1.chars.permutation.to_a.map(&:join).include?(str_2)
end

# Phase II:
# Write a method #second_anagram? that iterates over the first string. For each letter in the first string, find the index of that letter in the second string (hint: use Array#find_index) and delete at that index. The two strings are anagrams if an index is found for every letter and the second string is empty at the end of the iteration.
def second_anagram?(str_1, str_2)
  str_1.each_char do |char|
    idx = str_2.index(char)
    return false unless idx
    str_2[idx] = ""
  end
  str_2.empty?
end

# Phase III:
# Write a method #third_anagram? that solves the problem by sorting both strings alphabetically. The strings are then anagrams if and only if the sorted versions are the identical.
def third_anagram?(str_1, str_2)
  str_1.chars.sort == str_2.chars.sort
end

# Phase IV:
# Write one more method #fourth_anagram?. This time, use two Hashes to store the number of times each letter appears in both words. Compare the resulting hashes.
def fourth_anagram?(str_1, str_2)
  char_counts(str_1) == char_counts(str_2)
end

def char_counts(str)
  counts = Hash.new(0)
  str.each_char { |char| counts[char] += 1 }
  counts
end

# Bonus: Do it with only one hash.
def bonus_anagram?(str_1, str_2)
  return false unless str_1.length == str_2.length

  counts = Hash.new(0)
  str_1.length.times do |idx|
    char_1, char_2 = str_1[idx], str_2[idx]
    counts[char_1] += 1
    counts[char_2] -= 1
  end
  counts.values.all?(0)
end

# p bonus_anagram?("gizmo", "sally")    #=> false
# p bonus_anagram?("elviselvis", "liveslives")    #=> true
