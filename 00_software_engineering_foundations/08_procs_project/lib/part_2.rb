def reverser(str, &prc)
    prc.call(str.reverse)
end

def word_changer(sentence, &prc)
    sentence.split.map(&prc).join(' ')
end

def greater_proc_value(n, prc_1, prc_2)
    result_1, result_2 = prc_1.call(n), prc_2.call(n)
    result_1 > result_2 ? result_1 : result_2
end

def and_selector(arr, prc_1, prc_2)
    arr.select { |el| prc_1.call(el) && prc_2.call(el) }
end

def alternating_mapper(arr, prc_1, prc_2)
    arr.map.with_index do |el, i|
        i.even? ? prc_1.call(el) : prc_2.call(el)
    end
end