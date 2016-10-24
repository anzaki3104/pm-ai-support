class AddParamToEvents < ActiveRecord::Migration
  def change
    add_column :events, :param, :string
  end
end
