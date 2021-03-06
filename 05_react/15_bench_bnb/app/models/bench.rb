# == Schema Information
#
# Table name: benches
#
#  id          :bigint           not null, primary key
#  description :string           not null
#  lat         :float            not null
#  lon         :float            not null
#  seats       :integer          default(1), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_benches_on_lat_and_lon  (lat,lon) UNIQUE
#
class Bench < ApplicationRecord
  scope :filter_by, ->(bounds:, min_seats:, max_seats:) {
    where(
      lat: bounds[:south]..bounds[:north],
      lon: bounds[:west]..bounds[:east],
      seats: min_seats..max_seats
    )
  }

  has_one_attached :image
  has_many :reviews

  validates :description, presence: true
  validates :seats, presence: true, numericality: { greater_than: 0 }
  validates :lat, presence: true, uniqueness: { scope: :lon }
  validates :lon, presence: true
end
