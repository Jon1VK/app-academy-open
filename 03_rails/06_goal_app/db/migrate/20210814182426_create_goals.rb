class CreateGoals < ActiveRecord::Migration[6.1]
  def change
    create_table :goals do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title, null: false
      t.text :details
      t.boolean :private, default: false
      t.boolean :completed, default: false

      t.timestamps
    end
    add_index :goals, [:user_id, :title], unique: true
  end
end
