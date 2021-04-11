class Visit < ApplicationRecord
  belongs_to :user
  belongs_to :shortened_url
end
