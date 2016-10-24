class EventsController < ApplicationController

  protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format == 'application/json' }

  def index

    #project = Project.find_by(pjname: project_params)
    logger.debug("###")
    logger.debug( params[:project_id] )
    project = Project.find( params[:project_id] )
    logger.debug("###")
    @events = project.events

    respond_to do |format|
      format.html
      format.json { render json: @events.to_json(
        :only => ['event', 'operator', 'param'],
        :include => [ :actions => { :only => ['action', 'param'] } ] 
      ) }
      format.xml { render :xml => @events }
    end
  end

end
