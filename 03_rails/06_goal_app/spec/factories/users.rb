# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  password_digest :string           not null
#  username        :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_username  (username) UNIQUE
#
FactoryBot.define do
  factory :user do
    username { Faker::Name.unique.first_name }
    password { '123456' }

    factory :invalid_user do
      password { '' }
    end
  end
end
