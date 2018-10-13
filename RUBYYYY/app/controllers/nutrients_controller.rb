class NutrientsController < ApplicationController
  before_action :find_nutrient, only: [:show, :update]

  def index
    @nutrients = Nutrient.all
    render json: @nutrients
  end

  def show
    render json: @nutrient
  end

  def create
    @nutrient = Nutrient.new(nutrient_params)
    if @nutrient.save
      render json: @nutrient, status: :created, location: @nutrient
    else
      render json: @task.errors, status: :unprocessible_entity
    end
  end

  def update
    @nutrient.update(nutrient_params)
    if @nutrient.save
      render json: @nutrient, status: :accepted
    else
      render json: { errors: @nutrient.errors.full_messages }, status: :unprocessible_entity
    end
  end

  private

  def nutrient_params
    params.permit(:name)
  end

  def find_nutrient
    @nutrient = Nutrient.find(params[:id])
  end
end
