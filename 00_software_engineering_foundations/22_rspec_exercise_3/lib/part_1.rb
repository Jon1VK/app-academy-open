def is_prime?(num)
    return false if num < 2
    (2..Math.sqrt(num)).none? { |f| num % f == 0 }
end

def nth_prime(n)
    prime_count = 1
    num = 2

    while prime_count < n
        num += 1
        prime_count += 1 if is_prime?(num)
    end

    num
end

def prime_range(min, max)
    (min..max).select { |n| is_prime?(n) }
end