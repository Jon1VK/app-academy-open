Rails.application.routes.draw do
  root to: 'sessions#new'
  
  get '/signup', to: 'users#new'
  get '/login', to: 'sessions#new'
  get '/logout', to: 'sessions#destroy'

  resource :session, only: [:create]
  
  resources :users, only: [:create]
end
