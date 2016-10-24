class AddIndexPjnameToProjects < ActiveRecord::Migration
  def change
    add_index :projects, [:user_id, :pjname], unique: true
  end
end
