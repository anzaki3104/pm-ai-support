require 'spec_helper'

describe "EventsPages" do

  subject { page }


  params = '{"project":"test","events": [{"event":"say","operator":"=","param":"1","event_id":"1","actions": [{"action":"talk","param":"2"}]},{"event":"saw","operator":"==","param":"FACE","event_id":"2","actions": [{"action":"camera","param":""}]}]}'


  describe "GET /events.json" do

    @pj = Project.new  #Dummy

    before do
      post "/projects", params.to_json, { 'CONTENT_TYPE' => "application/json", "Accept" => "application/json" }
      @pj = Project.first 
    end


    it "/events.json" do
      get project_events_path(@pj.id, format: :json) 
      
      #Status Code
      expect(response.status).to eq 200

      #JSON
      json = JSON.parse( response.body )
      #events = json["events"]
      expect(json[0]["event"]).to   eq @pj.events[0].event
      expect(json[0]["operator"]).to   eq @pj.events[0].operator
      expect(json[0]["actions"][0]["action"]).to   eq @pj.events[0].actions[0].action
      expect(json[0]["actions"][0]["param"]).to   eq @pj.events[0].actions[0].param

      expect(json[1]["event"]).to   eq @pj.events[1].event
      expect(json[1]["operator"]).to   eq @pj.events[1].operator
      expect(json[1]["actions"][0]["action"]).to   eq @pj.events[1].actions[0].action
      expect(json[1]["actions"][0]["param"]).to   eq @pj.events[1].actions[0].param
    end



  end

end
