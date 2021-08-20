# == Schema Information
#
# Table name: comments
#
#  id                :bigint           not null, primary key
#  content           :text             not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  author_id         :bigint           not null
#  parent_comment_id :bigint
#  post_id           :bigint           not null
#
# Indexes
#
#  index_comments_on_author_id          (author_id)
#  index_comments_on_parent_comment_id  (parent_comment_id)
#  index_comments_on_post_id            (post_id)
#
# Foreign Keys
#
#  fk_rails_...  (author_id => users.id)
#  fk_rails_...  (parent_comment_id => comments.id)
#  fk_rails_...  (post_id => posts.id)
#
class Comment < ApplicationRecord
  belongs_to :author, class_name: 'User'
  belongs_to :post
  belongs_to :parent_comment, class_name: 'Comment', optional: true

  has_many :child_comments, class_name: 'Comment', foreign_key: "parent_comment_id"
end
