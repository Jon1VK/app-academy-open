FactoryBot.define do
  factory :step do
    title { Faker::Lorem.sentence }
    association :todo
  end
end
