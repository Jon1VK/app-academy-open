class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.references :author, null: false
      t.references :artwork, null: false, foreign_key: true
      t.string :body, null: false

      t.timestamps
    end

    add_foreign_key :comments, :users, column: :author_id
  end
end
