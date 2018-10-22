class IngredientNutrientSerializer < ActiveModel::Serializer
  attributes :nutrient_id, :unit, :value, :nutrients

  def nutrients
  object.nutrient.name
    
  end
end
