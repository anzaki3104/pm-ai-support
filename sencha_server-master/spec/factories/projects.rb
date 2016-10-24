# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do

  factory :project do
    user_id "test"
    sequence (:pjname) { |n| "test#{n}" }

    events { [
      FactoryGirl.create(:event)
    ] }
  end

end
