class Dog
    def initialize(name, breed, age, bark, favorite_foods)
        @name = name
        @breed = breed
        @age = age
        @bark = bark
        @favorite_foods = favorite_foods
    end

    attr_accessor :age
    attr_reader :name, :breed, :favorite_foods

    def bark
        @age > 3 ? @bark.upcase : @bark.downcase
    end

    def favorite_food?(food)
        @favorite_foods.any? { |favorite_food| favorite_food.downcase == food.downcase }
    end
end
