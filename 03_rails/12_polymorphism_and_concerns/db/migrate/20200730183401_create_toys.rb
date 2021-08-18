class CreateToys < ActiveRecord::Migration[5.1]
  def change
    create_table :toys do |t|
      t.string :name, null: false
      t.references :toyable, polymorphic: true

      t.timestamps
    end
    add_index :toys, [:name, :toyable_type, :toyable_id], unique: true
  end
end
