class CreatePosters < ActiveRecord::Migration[6.1]
  def change
    create_table :posters do |t|
      t.string :lynk
      t.string :votes
      t.references :movie, null: false, foreign_key: true

      t.timestamps
    end
  end
end
