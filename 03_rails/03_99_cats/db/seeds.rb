# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

c1 = Cat.create!(name: 'Cat 1', birth_date: '2019/01/01', sex: 'M', color: 'gray', description: 'Description 1')
c2 = Cat.create!(name: 'Cat 2', birth_date: '2020/01/01', sex: 'F', color: 'orange', description: 'Description 2')
c3 = Cat.create!(name: 'Cat 3', birth_date: '2021/01/01', sex: 'M', color: 'brown', description: 'Description 3')
