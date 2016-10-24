SenchaServer::Application.routes.draw do
  resources :projects do
    resources :events, only: [:index]
  end
  #get "events/new"
  #resources :events
end
