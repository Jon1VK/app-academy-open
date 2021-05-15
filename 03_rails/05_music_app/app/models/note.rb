# == Schema Information
#
# Table name: notes
#
#  id         :bigint           not null, primary key
#  note       :text             not null
#  user_id    :bigint           not null
#  track_id   :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Note < ApplicationRecord
  belongs_to :user
  belongs_to :track

  validates :note, presence: true
end
