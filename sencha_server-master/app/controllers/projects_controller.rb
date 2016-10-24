class ProjectsController < ApplicationController

  protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format == 'application/json' }

  def index
    @projects = Project.where( user_id: 'test' )

    respond_to do |format|
      format.html
      format.json { render json: @projects.to_json(
        :only => ['pjname', 'id']
      ) }
      format.xml { render :xml => @events }
    end
  end

  
  def show

    logger.debug("########Show######")
    @project = Project.find( params[:id] )

  end

  
  def destroy
    @project = Project.find( params[:id] ).destroy
    flash[:success] = "Project destroyed."
    redirect_to projects_url
  end


  def create

    @project = event_params

    logger.debug("=============hoge=================");
    logger.debug( @project.attributes )
    @project.events.each do |e|
      logger.debug( e.attributes )
      e.actions.each do |p|
        logger.debug( p.attributes )
      end
    end

    #before_project = Project.find_by( user_id: @project.user_id,
    #                                 pjname: @project.pjname )
    
    #if !before_project.nil?
    #  before_project.destroy
    #  logger.debug("=============destory=================");
    #end

    logger.debug("=============piyo=================");

    @project.save

    #flash[:success] = "Project saved."

    #redirect_to @project
    redirect_to projects_url

  end
  

  private

    def event_params

    json = params[ :_json ]

    logger.debug("=============params=================");
    project = ActiveSupport::JSON.decode json 

    logger.debug( project["events"] )
    events = project["events"]

    #@project = Project.new( user_id: "test", pjname: project["project"] )

    @project = Project.find_by( user_id: "test",
                                     pjname: project["project"] )

    if @project.nil? then
      @project = Project.new( user_id: "test", pjname: project["project"] )
    else
      #Delete events
      @project.events.each do |e|
        e.delete
      end
      logger.debug("============= delete =================")
      logger.debug(@project.events.count)
      logger.debug("============= delete =================")
    end



    @events = Array.new

    events.each do | e |

      event = Event.new( #id: e["event_id"],
                        event: e["event"],
                        operator: e["operator"],
                        param: e["param"] )

      e[ "actions" ].each do | a |

        action = Action.new( event_id: e["event_id"],
                             action: a["action"],
                             param: a["param"] )

        event.actions << action
        logger.debug( event.actions.length )
      end
      @events.push( event )
    end

    @project.events << @events


    logger.debug("=============params=================");

    return @project
  end
end
