def my_reject(arr, &prc)
    new_arr = []
    arr.each { |ele| new_arr << ele if !prc.call(ele) }
    new_arr
end

def my_one?(arr, &prc)
    found = false
    arr.each do |ele| 
        if prc.call(ele)
            return false if found
            found = true
        end
    end
    found
end

def hash_select(hash, &prc)
    new_hash = {}
    hash.each { |k, v| new_hash[k] = v if prc.call(k, v) }
    new_hash
end

def xor_select(arr, prc_1, prc_2)
    arr.select do |ele|
        r1, r2 = prc_1.call(ele), prc_2.call(ele)
        !(r1 && r2) && (r1 || r2)
    end
end

def proc_count(value, procs)
    procs.count { |prc| prc.call(value) }
end