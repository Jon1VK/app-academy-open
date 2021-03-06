# == Schema Information
#
# Table name: polls
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  user_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Poll < ApplicationRecord
  validates :title,
    presence: true

  belongs_to :author,
    class_name: 'User',
    foreign_key: :user_id

  has_many :questions
end
