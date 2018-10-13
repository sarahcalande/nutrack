class App {
constructor() {
this.adapter = new Adapter();
this.handleEditClick = this.handleEditClick.bind(this);
this.handleFormSubmit = this.handleFormSubmit.bind(this);
this.createIngredients = this.createIngredients.bind(this);
this.addIngredients = this.addIngredients.bind(this);
}

  attachEventListeners() {
    document.querySelector('#ingredients-list').addEventListener('click', this.handleEditClick);
    document.querySelector('#update').addEventListener('submit', this.handleFormSubmit);
    }


    createIngredients(ingredients) {
  ingredients.forEach(ingredient => {
    new Ingredient(ingredient);
  });
  this.addIngredients();
}

addIngredients() {
  document.querySelector('#ingredients-list').innerHTML = '';
  Ingredient.all.forEach(
    ingredient => (document.querySelector('#ingredients-list').innerHTML += ingredient.renderListItem())
  );
}

handleFormSubmit(e) {
  e.preventDefault();
  const id = parseInt(e.target.dataset.id);
  let ingredient = Ingredient.findById(id);
  const title = e.target.querySelector('input').value;
  const content = e.target.querySelector('textarea').value;
  const bodyJSON = { title, content };
  this.adapter.updateIngredient(ingredient.id, bodyJSON)
  .then(updatedIngredient => (
      // ingredient = Ingredient.findById(updatedIngredient.id)
      ingredient.update(updatedIngredient)

    ));
      this.addIngredients()
};



handleEditClick(e) {
  const id = parseInt(e.target.dataset.id);
  const ingredient = Ingredient.findById(id);
  document.querySelector('#update').innerHTML = ingredient.renderUpdateForm();
}
}
