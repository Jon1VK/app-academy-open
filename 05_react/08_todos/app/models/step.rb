# == Schema Information
#
# Table name: steps
#
#  id         :bigint           not null, primary key
#  done       :boolean          default(FALSE)
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  todo_id    :bigint           not null
#
# Indexes
#
#  index_steps_on_todo_id  (todo_id)
#
# Foreign Keys
#
#  fk_rails_...  (todo_id => todos.id)
#
class Step < ApplicationRecord
  belongs_to :todo

  validates :done, inclusion: { in: [true, false] }
  validates :title, presence: true
end
