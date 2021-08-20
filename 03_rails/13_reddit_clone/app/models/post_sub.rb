# == Schema Information
#
# Table name: post_subs
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  post_id    :bigint           not null
#  sub_id     :bigint           not null
#
# Indexes
#
#  index_post_subs_on_post_id             (post_id)
#  index_post_subs_on_post_id_and_sub_id  (post_id,sub_id) UNIQUE
#  index_post_subs_on_sub_id              (sub_id)
#
# Foreign Keys
#
#  fk_rails_...  (post_id => posts.id)
#  fk_rails_...  (sub_id => subs.id)
#
class PostSub < ApplicationRecord
  belongs_to :post
  belongs_to :sub

  validates :sub, uniqueness: { scope: :post }
end
