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

    def popular_links
        shortened_urls
            .select(:id, :long_url, :short_url, 'COUNT(visits.id) as number_of_clicks')
            .joins(:visits)
            .group(:id)
            .order('COUNT(visits.id) DESC')
            .limit(5)
    end
end
