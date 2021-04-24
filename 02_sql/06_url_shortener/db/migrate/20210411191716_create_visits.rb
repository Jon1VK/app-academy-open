class CreateVisits < ActiveRecord::Migration[6.1]
  def change
    create_table :visits do |t|
      t.references :user, null: false, foreign_key: true
      t.references :shortened_url, null: false, foreign_key: true

      t.timestamps
    end
  end
end
