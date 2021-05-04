class AddUserIdToCatRentalRequests < ActiveRecord::Migration[6.1]
  def change
    add_reference :cat_rental_requests, :user, null: false, foreign_key: true
  end
end
