class Ingredient < ApplicationRecord
  has_many :ingredient_nutrients
  has_many :nutrients, through: :ingredient_nutrients

end
