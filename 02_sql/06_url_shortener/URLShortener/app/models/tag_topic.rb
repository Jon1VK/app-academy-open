# == Schema Information
#
# Table name: tag_topics
#
#  id         :bigint           not null, primary key
#  topic      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class TagTopic < ApplicationRecord
    validates :topic,
        presence: true,
        uniqueness: true
    
    has_many :taggings

    has_many :shortened_urls,
        through: :taggings,
        source: :shortened_url
end
