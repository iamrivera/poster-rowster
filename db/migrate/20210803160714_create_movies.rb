class CreateMovies < ActiveRecord::Migration[6.1]
  def change
    create_table :movies do |t|
      t.string :title
      t.string :rating
      t.string :language
      t.string :director
      t.string :producer
      t.string :writer
      t.string :release
      t.string :sales
      t.string :runtime
      t.references :genre, null: false, foreign_key: true

      t.timestamps
    end
  end
end
