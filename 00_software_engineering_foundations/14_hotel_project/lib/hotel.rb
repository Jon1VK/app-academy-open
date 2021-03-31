require_relative "room"

class Hotel
    def initialize(name, rooms)
        @name = name
        @rooms = rooms.map { |room, capacity| [room, Room.new(capacity)] }.to_h
    end

    attr_reader :rooms

    def name
        @name.split.map(&:capitalize).join(' ')
    end

    def room_exists?(name)
        @rooms.has_key?(name)
    end

    def check_in(person, room)
        if room_exists?(room)
            if @rooms[room].add_occupant(person)
                puts 'check in successful'
            else
                puts 'sorry, room is full'
            end
        else
            puts 'sorry, room does not exist'
        end
    end

    def has_vacancy?
        @rooms.values.any? { |room| !room.full? }
    end

    def list_rooms
        @rooms.each { |name, room| puts "#{name} #{room.available_space}" }
    end
end
