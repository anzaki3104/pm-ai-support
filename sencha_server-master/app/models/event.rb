class Event < ActiveRecord::Base
  belongs_to :project
  has_many :actions, dependent: :destroy
  validates :event, presence: true
  validates :operator, presence: true
  validates :param, presence: true

  accepts_nested_attributes_for :actions
end
