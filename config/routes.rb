require 'sidekiq/web'

Rails.application.routes.draw do
  resources :charts do
    collection do
      get :add_params
      post :update_search_service
      post :update_schedule_service
      get :inputs_type_run_service
    end
  end

  mount Sidekiq::Web => '/sidekiq'
end
