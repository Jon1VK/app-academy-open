# == Schema Information
#
# Table name: taggings
#
#  id               :bigint           not null, primary key
#  shortened_url_id :bigint           not null
#  tag_topic_id     :bigint           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class Tagging < ApplicationRecord
  belongs_to :shortened_url
  belongs_to :tag_topic

  validates :tag_topic,
    uniqueness: { scope: :shortened_url }
end
