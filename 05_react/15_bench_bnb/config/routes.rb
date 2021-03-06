Rails.application.routes.draw do
  root to: 'static_pages#index'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    
    resources :benches, only: [:index, :show, :create]
    resources :reviews, only: [:create]
  end
end
