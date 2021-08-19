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
class User < ApplicationRecord
  has_secure_password
  has_many :moderated_subs, class_name: "Sub", foreign_key: "moderator_id"

  validates :username, presence: true, uniqueness: true
  validates :password, length: {minimum: 6}, allow_nil: {on: :update}
end
