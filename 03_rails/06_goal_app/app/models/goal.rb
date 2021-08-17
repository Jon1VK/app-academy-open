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
class Goal < ApplicationRecord
  include Commentable

  default_scope { order(:created_at) }
  scope :public_goals, -> { where(private: false) }

  belongs_to :user

  validates :title, presence: true, uniqueness: { scope: :user_id }
  validates :private, inclusion: { in: [true, false] }
  validates :completed, inclusion: { in: [true, false] }
end
