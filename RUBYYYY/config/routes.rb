Rails.application.routes.draw do
  resources :ingredient_nutrients
  resources :nutrients
  resources :ingredients
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
