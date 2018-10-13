class CreateIngredientNutrients < ActiveRecord::Migration[5.2]
  def change
    create_table :ingredient_nutrients do |t|
      t.integer :ingredient_id
      t.integer :nutrient_id
      t.string :unit
      t.string :value

      t.timestamps
    end
  end
end
