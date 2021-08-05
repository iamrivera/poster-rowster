Rails.application.routes.draw do
  resources :genres do 
    resources :movies
  end
  resources :movies do 
    resources :posters
  end
  resources :posters

  get '/posters/:id/add_vote', to: 'posters#add_vote'
end
