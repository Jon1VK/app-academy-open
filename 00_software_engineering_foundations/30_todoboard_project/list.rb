require_relative 'item'

class List
    attr_accessor :label

    def initialize(label)
        @label = label
        @items = []
    end

    def add_item(title, deadline, description='')
        begin
            @items << Item.new(title, deadline, description)
            true
        rescue RuntimeError
            false
        end
    end

    def size
        @items.length
    end

    def valid_index?(index)
        index.between?(0, @items.length - 1)
    end

    def swap(i, j)
        return false if !valid_index?(i) || !valid_index?(j)

        @items[i], @items[j] = @items[j], @items[i]
        true
    end

    def [](i)
        @items[i] if valid_index?(i)
    end

    def priority
        @items.first
    end

    def print
        str = "-" * 49 + "\n"
        str += @label.upcase + "\n"
        str += "-" * 49 + "\n"
        str += "Index | Item".ljust(29) + "| Deadline".ljust(13) + "| Done\n"
        str += "-" * 49 + "\n"
        @items.each_with_index do |item, i|
            str += "#{i.to_s.ljust(5)} | #{item.title.ljust(20)} | #{item.deadline} | [#{item.done ? "\u2713" : " "}]\n"
        end
        str += "-" * 49 + "\n"
        puts str
    end

    def print_full_item(i)
        item = self[i]
        puts item if item
    end

    def print_priority
        puts priority if priority
    end

    def up(i, amount=1)
        return false if !valid_index?(i)

        while amount > 0 && i > 0
            swap(i, i-1)
            i -= 1
            amount -= 1
        end

        true
    end

    def down(i, amount=1)
        return false if !valid_index?(i)

        while amount > 0 && i < @items.length - 1
            swap(i, i+1)
            i += 1
            amount -= 1
        end

        true
    end

    def sort_by_date!
        @items.sort_by! { |item| item.deadline }
    end

    def toggle_item(i)
        item = self[i]
        item.toggle if item
    end

    def remove_item(index)
        return false if !valid_index?(index)
        @items.delete_at(index)
        true
    end

    def purge
        @items.reject! { |item| item.done }
    end
end
