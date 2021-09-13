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
  has_many :steps, dependent: :destroy
  has_many :taggings, dependent: :delete_all
  has_many :tags, through: :taggings

  validates :body, presence: true
  validates :done, inclusion: { in: [true, false] }
  validates :title, presence: true

  def tag_names=(tag_names)
    self.tags = tag_names.map do |tag_name|
      Tag.find_or_create_by(name: tag_name)
    end
  end
end
