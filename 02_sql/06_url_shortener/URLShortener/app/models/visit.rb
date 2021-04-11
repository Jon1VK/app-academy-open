# == Schema Information
#
# Table name: visits
#
#  id               :bigint           not null, primary key
#  user_id          :bigint           not null
#  shortened_url_id :bigint           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class Visit < ApplicationRecord
  belongs_to :user

  belongs_to :shortened_url

  self.singleton_class.send(:alias_method, :record_visit, :create)
end
