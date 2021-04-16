# == Schema Information
#
# Table name: users
#
#  id         :bigint           not null, primary key
#  email      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  premium    :boolean          default(FALSE)
#
class User < ApplicationRecord
    validates :email,
        presence: true,
        uniqueness: true

    has_many :shortened_urls
    alias_method :submitted_urls, :shortened_urls

    has_many :visits

    has_many :visited_urls,
        -> { distinct },
        through: :visits,
        source: :shortened_url
end
