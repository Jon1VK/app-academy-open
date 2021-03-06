FactoryBot.define do
  factory :todo do
    association :user
    title { Faker::Lorem.sentence }
    body { Faker::Lorem.paragraph }
    tag_names { 3.times.map { Faker::Lorem.word } }
  end
end