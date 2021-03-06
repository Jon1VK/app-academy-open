# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password
  
  has_many :notes

  validates :email, presence: true, uniqueness: true
  validates :password , length: { minimum: 6 }
end
