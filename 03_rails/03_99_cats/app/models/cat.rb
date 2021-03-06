# == Schema Information
#
# Table name: cats
#
#  id          :bigint           not null, primary key
#  name        :string           not null
#  birth_date  :date             not null
#  sex         :string(1)        not null
#  color       :string           not null
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :bigint           not null
#
class Cat < ApplicationRecord
  COLORS = %w(black white orange brown gray)

  belongs_to :owner, class_name: 'User', foreign_key: :user_id

  has_many :cat_rental_requests,
    dependent: :destroy

  validates :name, :birth_date,
    presence: true

  validates :sex,
    inclusion: { in: %w(M F) }

  validates :color,
    inclusion: { in: Cat::COLORS }

  def age
    ApplicationController.helpers.time_ago_in_words(self.birth_date)
  end
end
