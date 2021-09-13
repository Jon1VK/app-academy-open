# == Schema Information
#
# Table name: taggings
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  tag_id     :bigint           not null
#  todo_id    :bigint           not null
#
# Indexes
#
#  index_taggings_on_tag_id   (tag_id)
#  index_taggings_on_todo_id  (todo_id)
#
# Foreign Keys
#
#  fk_rails_...  (tag_id => tags.id)
#  fk_rails_...  (todo_id => todos.id)
#
class Tagging < ApplicationRecord
  belongs_to :todo
  belongs_to :tag

  validates :tag, uniqueness: { scope: :todo }
end
