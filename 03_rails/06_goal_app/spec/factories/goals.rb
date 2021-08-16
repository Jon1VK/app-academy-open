# == Schema Information
#
# Table name: goals
#
#  id         :bigint           not null, primary key
#  completed  :boolean          default(FALSE)
#  details    :text
#  private    :boolean          default(FALSE)
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_goals_on_user_id            (user_id)
#  index_goals_on_user_id_and_title  (user_id,title) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
FactoryBot.define do
  factory :goal do
    title { Faker::Lorem.unique.word }
    details { Faker::Lorem.sentence }
    private { [true, false].sample }
    completed { [true, false].sample }
    association :user
  end
end
