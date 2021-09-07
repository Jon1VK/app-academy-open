FactoryBot.define do
  factory :todo do
    title { Faker::Lorem.sentence }
    body { Faker::Lorem.paragraph }
  end
end