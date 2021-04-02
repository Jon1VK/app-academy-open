class Item
    def self.valid_date?(date_string)
        year, month, day = date_string.split('-').map(&:to_i)
        month.between?(1,12) && day.between?(1,31)
    end

    attr_accessor :title, :description
    attr_reader :deadline, :done

    def initialize(title, deadline, description)
        raise 'Invalid deadline date' if !Item.valid_date?(deadline)
        @title = title
        @deadline = deadline
        @description = description
        @done = false
    end

    def deadline=(deadline)
        raise 'Invalid deadline date' if !Item.valid_date?(deadline)
        @deadline = deadline
    end

    def toggle
        @done = !@done
    end

    def to_s
        str = "-" * 49 + "\n"
        str += "#{@title.ljust(34)} #{@deadline} [#{@done ? "\u2713" : " "}]\n"
        str += "#{@description}\n"
        str += "-" * 49 + "\n"
        str
    end
end
