# == Schema Information
#
# Table name: shortened_urls
#
#  id         :bigint           not null, primary key
#  long_url   :string           not null
#  short_url  :string           not null
#  user_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class ShortenedUrl < ApplicationRecord
  validates :short_url,
    presence: true,
    uniqueness: true
  
  validates :long_url, 
    presence: true

  belongs_to :user
  alias_method :submitter, :user

  has_many :visits
  
  has_many :visitors,
    -> { distinct },
    through: :visits,
    source: :user

  has_many :taggings

  has_many :tag_topics,
    through: :taggings,
    source: :tag_topic

  def num_clicks
    visits.count
  end

  def num_uniques
    visitors.count
  end

  def num_recent_uniques
    visits.select(:user_id).where(updated_at: 10.minutes.ago..Time.now).distinct.count
  end

  def self.create_from(attributes)
    self.create(**attributes, short_url: self.random_code)
  end

  def self.random_code
    loop do
      code = SecureRandom.urlsafe_base64
      return code if !self.exists?(short_url: code)
    end
  end
end
