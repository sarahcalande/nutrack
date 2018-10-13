class IngredientNutrientsController < ApplicationController
  before_action :find_ingredient_nutrient, only: [:show, :update]

  def index
    @ingredient_nutrient = IngredientNutrient.all
    render json: @ingredient_nutrient
  end

  def show
    render json: @ingredient_nutrient
  end

  def update
    @ingredient_nutrient.update(ingredient_nutrient_params)
    if @ingredient_nutrient.save
      render json: @ingredient_nutrient, status: :accepted
    else
      render json: { errors: @ingredient_nutrient.errors.full_messages }, status: :unprocessible_entity
    end
  end

  private

  def ingredient_nutrient_params
    params.permit(:ingredient_id, :nutrient_id, :unit, :value)
  end

  def find_ingredient_nutrient
    @ingredient_nutrient = IngredientNutrient.find(params[:id])
  end
end
