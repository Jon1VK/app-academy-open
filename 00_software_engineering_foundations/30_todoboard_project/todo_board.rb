require_relative 'item'
require_relative 'list'

class TodoBoard
    def initialize
        @lists = Hash.new { |h, k| h[k] = List.new(k) }
    end

    def get_command
        print "Enter a command: "
        cmd, label, *args = gets.chomp.split(' ')

        case cmd
        when 'mklist'
            @lists[label] = List.new(label) if !@lists.has_key?(label)
        when 'ls'
            puts @lists.keys
        when 'showall'
            @lists.values.each(&:print)
        when 'mktodo'
            @lists[label].add_item(*args)
        when 'up'
            @lists[label].up(*args.map(&:to_i))
        when 'down'
            @lists[label].down(*args.map(&:to_i))
        when 'swap'
            @lists[label].swap(*args.map(&:to_i))
        when 'sort'
            @lists[label].sort_by_date!
        when 'priority'
            @lists[label].print_priority
        when 'toggle'
            @lists[label].toggle_item(*args.map(&:to_i))
        when 'rm'
            @lists[label].remove_item(*args.map(&:to_i))
        when 'purge'
            @lists[label].purge
        when 'print'
            if args.length == 0
                @lists[label].print
            else
                @lists[label].print_full_item(*args.map(&:to_i))
            end
        when 'quit'
            return false
        else
            puts "Sorry, that command is not recognized."
        end

        true
    end

    def run
        next while get_command
    end
end
