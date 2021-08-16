Rails.application.routes.draw do
  root 'users#index'
  get '/login', to: 'sessions#new'
  get '/logout', to: 'sessions#destroy'
  get '/signup', to: 'users#new'

  resource :sessions, only: [:new, :create, :destroy]
  resources :users, only: [:index, :show, :new, :create] do
    resources :goals, only: [:new, :create]
  end
  resources :goals, only: [:show, :update, :destroy]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
