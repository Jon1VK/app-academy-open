class CreatePostSubs < ActiveRecord::Migration[6.1]
  def change
    create_table :post_subs do |t|
      t.references :post, null: false, foreign_key: true
      t.references :sub, null: false, foreign_key: true

      t.timestamps
    end
      add_index :post_subs, [:post_id, :sub_id], unique: true
  end
end
