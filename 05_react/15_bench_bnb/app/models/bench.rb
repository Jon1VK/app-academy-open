# == Schema Information
#
# Table name: benches
#
#  id          :bigint           not null, primary key
#  description :string           not null
#  lat         :float            not null
#  lon         :float            not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_benches_on_lat_and_lon  (lat,lon) UNIQUE
#
class Bench < ApplicationRecord
  validates :description, presence: true
  validates :lat, presence: true, uniqueness: { scope: :lon }
  validates :lon, presence: true
end
