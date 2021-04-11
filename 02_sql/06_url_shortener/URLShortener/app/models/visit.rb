class Visit < ApplicationRecord
  belongs_to :user

  belongs_to :shortened_url

  self.singleton_class.send(:alias_method, :record_visit, :create)
end
