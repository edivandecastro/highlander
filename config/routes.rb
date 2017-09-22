require 'sidekiq/web'

Rails.application.routes.draw do
  resources :charts do
    collection do
      get :add_params
      post :update_search_service
    end
  end

  mount Sidekiq::Web => '/sidekiq'
end
