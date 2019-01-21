class NutrientSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :value, :unit, :suggestion
  # has_many :ingredient_nutrients
  has_many :ingredients, through: :ingredient_nutrients
end
