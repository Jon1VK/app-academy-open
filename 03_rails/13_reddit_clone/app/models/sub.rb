# == Schema Information
#
# Table name: subs
#
#  id           :bigint           not null, primary key
#  description  :text
#  title        :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  moderator_id :bigint           not null
#
# Indexes
#
#  index_subs_on_moderator_id  (moderator_id)
#  index_subs_on_title         (title) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (moderator_id => users.id)
#
class Sub < ApplicationRecord
  belongs_to :moderator, class_name: 'User'

  validates :title, presence: true, uniqueness: true
end
