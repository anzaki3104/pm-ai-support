# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do

  factory :event do
    event "say"
    operator "="
    param "piyo"

    #actions { [
    #  FactoryGirl.create(:action)
    #] }
  end

end
