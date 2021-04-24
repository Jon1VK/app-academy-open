class CreateTaggings < ActiveRecord::Migration[6.1]
  def change
    create_table :taggings do |t|
      t.references :shortened_url, null: false, foreign_key: true
      t.references :tag_topic, null: false, foreign_key: true

      t.timestamps
    end
    add_index :taggings, [:shortened_url_id, :tag_topic_id], unique: true
  end
end
