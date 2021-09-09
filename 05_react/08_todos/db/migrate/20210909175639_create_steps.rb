class CreateSteps < ActiveRecord::Migration[6.1]
  def change
    create_table :steps do |t|
      t.string :title, null: false
      t.boolean :done, default: false
      t.references :todo, null: false, foreign_key: true

      t.timestamps
    end
  end
end
