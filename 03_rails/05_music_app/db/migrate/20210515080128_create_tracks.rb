class CreateTracks < ActiveRecord::Migration[6.1]
  def change
    create_table :tracks do |t|
      t.string :title, null: false
      t.integer :order, null: false
      t.text :lyrics
      t.boolean :bonus, default: false
      t.references :album, null: false, foreign_key: true

      t.timestamps
    end
    add_index :tracks, [:album_id, :order], unique: true
  end
end
