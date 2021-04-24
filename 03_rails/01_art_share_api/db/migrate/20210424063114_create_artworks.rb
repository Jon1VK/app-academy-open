class CreateArtworks < ActiveRecord::Migration[6.1]
  def change
    create_table :artworks do |t|
      t.string :title, null: false
      t.string :image_url, null: false
      t.references :artist, null: false

      t.timestamps
    end

    add_foreign_key :artworks, :users, column: :artist_id
    add_index :artworks, [:artist_id, :title], unique: true
  end
end
