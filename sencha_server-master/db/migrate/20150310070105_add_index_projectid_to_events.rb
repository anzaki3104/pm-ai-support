class AddIndexProjectidToEvents < ActiveRecord::Migration
  def change
     add_index :events, [:project_id, :id], unique: true
  end
end
