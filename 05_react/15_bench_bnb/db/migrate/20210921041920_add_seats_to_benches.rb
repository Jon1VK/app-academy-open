class AddSeatsToBenches < ActiveRecord::Migration[6.1]
  def change
    add_column :benches, :seats, :integer, null: false, default: 1
  end
end
