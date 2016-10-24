class Action < ActiveRecord::Base
  belongs_to :event
  validates :action, presence: true
  validates :event_id, presence: true

end
