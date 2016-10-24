require 'spec_helper'

describe Action do

  let(:e) { FactoryGirl.create(:event) }

   before { @action = e.actions.build( action: "camera", param: "") } 

      subject { @action }

      it { should respond_to(:action) }
      it { should respond_to(:param) }
      it { should respond_to(:event_id) }

      it { should be_valid }

      describe "when event_id is not present" do
        before { @action.event_id = nil }
        it { should_not be_valid }
      end

      describe "when action is not present" do
        before { @action.action = nil }
        it { should_not be_valid }
      end
end
