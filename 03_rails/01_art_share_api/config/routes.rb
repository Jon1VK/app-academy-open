Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  resources :users, except: [:new, :edit]
  # get 'users/', to: 'users#index', as: 'users'
  # post 'users/', to: 'users#create'
  # get 'users/:id', to: 'users#show', as: 'user'
  # patch 'users/:id', to: 'users#update'
  # put 'users/:id', to: 'users#update'
  # delete 'users/:id', to: 'users#destroy'

  resources :artworks, except: [:new, :edit]

  resources :artwork_shares, only: [:create, :destroy]
end
