Rails.application.routes.draw do
  root to: 'static_pages#index'
  get 'signup', to: 'users#new'
  get 'login', to: 'sessions#new'

  resources :users, only: [:create]
  resource :session, only: [:create, :destroy]

  namespace :api do
    resources :todos
    resources :steps
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
