class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :user_id
      t.string :pjname

      t.timestamps
    end
  end
end
