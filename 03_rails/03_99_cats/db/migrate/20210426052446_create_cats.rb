class CreateCats < ActiveRecord::Migration[6.1]
  def change
    create_table :cats do |t|
      t.string :name, null: false
      t.date :birth_date, null: false
      t.string :sex, limit: 1, null: false
      t.string :color, null: false
      t.text :description

      t.timestamps
    end
  end
end
