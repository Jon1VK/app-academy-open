Rails.application.routes.draw do
  root to: 'bands#index'

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  resources :bands
end
