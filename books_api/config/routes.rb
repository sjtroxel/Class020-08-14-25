Rails.application.routes.draw do
  post '/login', to: 'sessions#create'
  resources :users, only: [:create]
  resources :books

  get '/my_books', to: 'books#my_books'
end
