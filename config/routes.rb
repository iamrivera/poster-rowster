Rails.application.routes.draw do
  resources :genres 

  resources :movies 
  
  resources :posters

  get '/posters/:id/add_vote', to: 'posters#add_vote'
  get '/genres/:id/movies', to: 'genres#genre_movies'
  get '/movies/:id/posters', to: 'movies#movie_posters'
end
