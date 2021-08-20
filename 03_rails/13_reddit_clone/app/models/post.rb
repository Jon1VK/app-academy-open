# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  content    :text
#  title      :string           not null
#  url        :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  author_id  :bigint           not null
#
# Indexes
#
#  index_posts_on_author_id  (author_id)
#
# Foreign Keys
#
#  fk_rails_...  (author_id => users.id)
#
class Post < ApplicationRecord
  belongs_to :author, class_name: 'User'

  has_many :comments
  has_many :post_subs
  has_many :subs, through: :post_subs

  validates :title, presence: true
  validates :subs, presence: true

  def top_level_comments
     comments.where(parent_comment: nil)
  end
end
