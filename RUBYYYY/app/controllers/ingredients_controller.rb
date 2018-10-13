class IngredientsController < ApplicationController
  before_action :find_ingredient, only: [:show, :update]

  def index
    @ingredients = Ingredient.all
    render json: @ingredients
  end

  def show
    render json: @ingredient
  end

  def update
    @ingredient.update(ingredient_params)
    if @ingredient.save
      render json: @ingredient, status: :accepted
    else
      render json: { errors: @ingredient.errors.full_messages }, status: :unprocessible_entity
    end
  end

  private

  def ingredient_params
    params.permit(:name, :measure)
  end

  def find_ingredient
    @ingredient = Ingredient.find(params[:id])
  end
end
