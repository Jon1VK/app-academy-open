class ChangeUsersTable < ActiveRecord::Migration[6.1]
  def change
    change_table :users do |t|
      t.rename :name, :username
      t.remove :email
    end

    add_index :users, :username, unique: true
  end
end
