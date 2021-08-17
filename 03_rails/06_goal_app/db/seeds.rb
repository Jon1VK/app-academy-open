# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Comment.destroy_all
Goal.destroy_all
User.destroy_all

users = []

5.times do
  user = FactoryBot.create(:user)

  users.each do |u|
    FactoryBot.create(:user_comment, user: user, commentable: u )
  end

  5.times do
    goal = FactoryBot.create(:goal, user: user)
    
    users.each do |u|
      FactoryBot.create(:goal_comment, user: u, commentable: goal )
    end
  end

  users << user
end
