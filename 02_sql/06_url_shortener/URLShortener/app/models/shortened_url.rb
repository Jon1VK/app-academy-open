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

  def self.create_from(attributes)
    p attributes
    self.create(**attributes, short_url: self.random_code)
  end

  def self.random_code
    loop do
      code = SecureRandom.urlsafe_base64
      return code if !self.exists?(short_url: code)
    end
  end
end
