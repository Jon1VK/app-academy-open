# == Schema Information
#
# Table name: todos
#
#  id         :bigint           not null, primary key
#  body       :text             not null
#  done       :boolean          default(FALSE)
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Todo < ApplicationRecord
  validates :body, presence: true
  validates :done, inclusion: { in: [true, false] }
  validates :title, presence: true
end
