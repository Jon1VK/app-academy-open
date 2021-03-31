# Monkey-Patch Ruby's existing Array class to add your own custom methods
class Array
    def span
        return nil if self.empty?
        self.max - self.min
    end

    def average
        return nil if self.empty?
        1.0 * self.sum / self.length
    end

    def median
        return nil if self.empty?

        mid = self.length / 2

        if self.length.odd?
            self.sort[mid]
        else
            self.sort[mid-1..mid].average
        end
    end

    def counts
        el_counts = Hash.new { |h, k| h[k] = 0 }
        self.each { |el| el_counts[el] += 1 }
        el_counts
    end

    def my_count(el)
        self.counts[el]
    end

    def my_index(s_el)
        self.each_with_index { |el, i| return i if s_el == el }
        nil
    end

    def my_uniq
        self.counts.keys
    end

    def my_transpose
        new_arr = Array.new(self.length) { Array.new(self.length) }
        (0...self.length).each do |i|
            (0...self.length).each do |j|
                new_arr[j][i] = self[i][j]
            end
        end
        new_arr
    end
end
