class CreateArtworkShares < ActiveRecord::Migration[6.1]
  def change
    create_table :artwork_shares do |t|
      t.references :artwork, null: false, foreign_key: true
      t.references :viewer, null: false

      t.timestamps
    end

    add_foreign_key :artwork_shares, :users, column: :viewer_id
    add_index :artwork_shares, [:artwork_id, :viewer_id], unique: true
  end
end
