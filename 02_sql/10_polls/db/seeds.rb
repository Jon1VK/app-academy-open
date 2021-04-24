# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

u1 = User.create!(username: 'Joni Vainio-Kaila')
u2 = User.create!(username: 'Elli Esimerkki')
u3 = User.create!(username: 'Matti Mallikas')

p1 = Poll.create!(title: 'Poll 1: Joni', author: u1)
p2 = Poll.create!(title: 'Poll 2: Joni', author: u1)
p3 = Poll.create!(title: 'Poll 3: Elli', author: u2)

q1 = Question.create!(text: 'Question 1: Poll 1', poll: p1)
q2 = Question.create!(text: 'Question 2: Poll 1', poll: p1)
q3 = Question.create!(text: 'Question 3: Poll 3', poll: p3)

a1 = AnswerChoice.create!(text: 'Answer 1: Question 1', question: q1)
a2 = AnswerChoice.create!(text: 'Answer 2: Question 1', question: q1)
a3 = AnswerChoice.create!(text: 'Answer 3: Question 1', question: q1)

r1 = Response.create!(respondent: u3, answer_choice: a1)
r2 = Response.create!(respondent: u2, answer_choice: a1)
