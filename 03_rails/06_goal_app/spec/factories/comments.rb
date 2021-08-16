# == Schema Information
#
# Table name: comments
#
#  id               :bigint           not null, primary key
#  commentable_type :string           not null
#  content          :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  commentable_id   :bigint           not null
#  user_id          :bigint           not null
#
# Indexes
#
#  index_comments_on_commentable  (commentable_type,commentable_id)
#  index_comments_on_user_id      (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
FactoryBot.define do
  factory :user_comment, class: Comment do
    association :user
    content { Faker::Lorem.paragraph }
    association :commentable, factory: :user
  end
  
  factory :goal_comment, class: Comment do
    association :user
    content { Faker::Lorem.paragraph }
    association :commentable, factory: :goal
  end
end
