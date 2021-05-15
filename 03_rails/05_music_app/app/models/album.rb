# == Schema Information
#
# Table name: albums
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  year       :integer          not null
#  live       :boolean          default(FALSE)
#  band_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Album < ApplicationRecord
  belongs_to :band

  has_many :tracks, dependent: :destroy

  validates :title, presence: true, uniqueness: { scope: :band_id }
  validates :year, presence: true
end
