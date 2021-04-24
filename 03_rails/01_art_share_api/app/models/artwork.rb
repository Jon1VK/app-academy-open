# == Schema Information
#
# Table name: artworks
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  image_url  :string           not null
#  artist_id  :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Artwork < ApplicationRecord
  validates :title, :image_url,
    presence: true

  validates :title,
    uniqueness: { scope: :artist_id }

  belongs_to :artist,
    class_name: 'User'

  has_many :artwork_shares,
    dependent: :destroy

  has_many :shared_viewers,
    through: :artwork_shares,
    source: :viewer

  def self.find_by_user_id(user_id)
    Artwork
      .left_outer_joins(:artwork_shares)
      .where(artwork_shares: { viewer_id: user_id })
      .or(Artwork
      .where(artist_id: user_id))
      .distinct
  end
end
