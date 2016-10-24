class Project < ActiveRecord::Base
  has_many :events, dependent: :destroy
  validates :pjname, presence: true
  validates :user_id, presence: true
  #self.primary_key = :user_id, :pjname

  accepts_nested_attributes_for :events
end
