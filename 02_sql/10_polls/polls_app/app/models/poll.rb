# == Schema Information
#
# Table name: polls
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  user_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Poll < ApplicationRecord
  belongs_to :user
end
