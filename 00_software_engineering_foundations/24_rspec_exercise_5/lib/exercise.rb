def zip(*arrays)
    new_arr = Array.new(arrays.first.length) { Array.new }
    arrays.each_with_index do |array, row|
        array.each_with_index do |value, col|
            new_arr[col][row] = value
        end
    end
    new_arr
end

def prizz_proc(arr, prc_1, prc_2)
    arr.select { |ele| [prc_1, prc_2].one? { |prc| prc.call(ele) } }
end

def zany_zip(*arrays)
    new_arr = Array.new(arrays.map(&:length).max) { Array.new(arrays.length, nil) }
    arrays.each_with_index do |array, row|
        array.each_with_index do |value, col|
            new_arr[col][row] = value
        end
    end
    new_arr
end

def maximum(arr, &prc)
    return nil if arr.empty?

    max_el = arr.first
    max_value = prc.call(max_el)

    arr.each do |el|
        value = prc.call(el)
        if value >= max_value
            max_el = el
            max_value = value
        end
    end

    return max_el
end

def my_group_by(arr, &prc)
    hash = Hash.new { |h, k| h[k] = Array.new }
    arr.each { |el| hash[prc.call(el)] << el }
    hash
end

def max_tie_breaker(arr, prc_1, &prc_2)
    arr.max do |e1, e2|
        puts e1, e2
        r1 = prc_2.call(e1)
        r2 = prc_2.call(e2)

        if r1 == r2
            if prc_1.call(e1) > prc_1.call(e2)
                1
            else
                -1
            end
        else
            r1 <=> r2
        end
    end
end

def silly_syllables(sentence)
    sentence.split.map do |word|
        vowels = 'aeiou'
        first = nil
        last = nil

        (0...word.length).each do |i|
            first = i if !first && vowels.include?(word[i])
            last = word.length-1-i if !last && vowels.include?(word[-1-i])
        end

        if first == last
            word
        else
            word[first..last]
        end
    end.join(' ')
end