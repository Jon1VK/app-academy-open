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

  validate :no_spamming

  validate :nonpremium_max

  belongs_to :user
  alias_method :submitter, :user

  has_many :visits,
    dependent: :destroy
  
  has_many :visitors,
    -> { distinct },
    through: :visits,
    source: :user

  has_many :taggings,
    dependent: :destroy

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

  def self.create_for_user_and_long_url!(user, long_url)
    self.create!(user: user, long_url: long_url, short_url: self.random_code)
  end

  def self.random_code
    loop do
      code = SecureRandom.urlsafe_base64
      return code if !self.exists?(short_url: code)
    end
  end

  def self.prune(n)
    self.joins(:user)
      .left_outer_joins(:visits)
      .group(:id)
      .where(user: { premium: false })
      .having(<<-SQL, n.minutes.ago, n.minutes.ago)
        (MAX(visits.created_at) IS NULL AND shortened_urls.created_at < ?) OR
        MAX(visits.created_at) < ?
      SQL
      .destroy_all
  end

  private

  def no_spamming
    fifth_latest = submitter
      .submitted_urls
      .order('created_at DESC')
      .offset(4)
      .first

    if fifth_latest && fifth_latest.created_at > 1.minutes.ago
      errors.add(:base, 'Too many submitted URLs in the last minute.')
    end
  end

  def nonpremium_max
    count = submitter
      .submitted_urls
      .count

    unless submitter.premium || count < 5
      errors.add(:base, 'Too many submitted URLs for nonpremium user.')
    end
  end
end
