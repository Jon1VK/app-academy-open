class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.integer :rating, null: false
      t.string :comment
      t.references :user, null: false, foreign_key: true
      t.references :bench, null: false, foreign_key: true

      t.timestamps
    end

    add_index :reviews, [:user_id, :bench_id], unique: true
  end
end
