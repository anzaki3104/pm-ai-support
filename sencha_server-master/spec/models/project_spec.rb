require 'spec_helper'

describe Project do

  before do
    @project = Project.new( pjname: "test",
                            user_id: "1" )
  end

  subject { @project }

  it { should respond_to(:pjname) }
  it { should respond_to(:user_id) }

  it { should be_valid }

  describe "when pjname is not present" do
    before { @project.pjname = " " }
    it { should_not be_valid }
  end

  describe "when user_id is not present" do
    before { @project.user_id = " " }
    it { should_not be_valid }
  end
end
