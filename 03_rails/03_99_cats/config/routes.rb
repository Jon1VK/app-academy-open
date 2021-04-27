Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'cats#index'

  resources :cats, except: :destroy

  resources :cat_rental_requests, only: [:new, :create] do
    member do
      post :approve, :deny
    end
  end
end
