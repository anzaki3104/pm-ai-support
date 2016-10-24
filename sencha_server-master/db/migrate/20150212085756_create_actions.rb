class CreateActions < ActiveRecord::Migration
  def change
    create_table :actions do |t|
      t.string :action
      t.string :param

      t.timestamps
    end
  end
end
