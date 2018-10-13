class IngredientSerializer < ActiveModel::Serializer
  attributes :id, :name, :measure
  has_many :ingredient_nutrients
  # has_many :nutrients, through: :ingredient_nutrients

end
