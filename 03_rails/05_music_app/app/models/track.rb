# == Schema Information
#
# Table name: tracks
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  order      :integer          not null
#  lyrics     :text
#  bonus      :boolean          default(FALSE)
#  album_id   :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Track < ApplicationRecord
  belongs_to :album

  delegate :band, to: :album

  validates :title, presence: true
  validates :order, presence: true, uniqueness: { scope: :album_id }
end
