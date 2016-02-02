Rails.application.routes.draw do
  get '/', to: 'pages#index'

  namespace :api do
    namespace :v1 do
      resources :ideas, only: [:index, :show, :create, :update, :destroy ], defaults: {format: :json}
    end
  end
end
