Rails.application.routes.draw do
  root to: 'subs#index'
  
  get '/signup', to: 'users#new'
  get '/login', to: 'sessions#new'
  get '/logout', to: 'sessions#destroy'

  resource :session, only: [:create]
  resources :users, only: [:create]
  resources :subs, except: :destroy
  resources :posts, except: [:index, :destroy]
end
