class CreateAlbums < ActiveRecord::Migration[6.1]
  def change
    create_table :albums do |t|
      t.string :title, null: false
      t.integer :year, null: false
      t.boolean :live, default: false
      t.references :band, null: false, foreign_key: true

      t.timestamps
    end
    add_index :albums, [:band_id, :title], unique: true
  end
end
