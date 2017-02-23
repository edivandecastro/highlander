require 'sidekiq/web'

Rails.application.routes.draw do
  resources :charts

  mount Sidekiq::Web => '/sidekiq'
end
