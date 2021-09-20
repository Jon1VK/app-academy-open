class CreateBenches < ActiveRecord::Migration[6.1]
  def change
    create_table :benches do |t|
      t.string :description, null: false
      t.float :lat, null: false
      t.float :lon, null: false

      t.timestamps
    end
    add_index :benches, [:lat, :lon], unique: true
  end
end
