# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Tag.destroy_all

2.times do
  user = FactoryBot.create(:user)
  6.times do
    todo = FactoryBot.create(:todo, user: user)
    3.times do
      FactoryBot.create(:step, todo: todo)
    end
  end
end

