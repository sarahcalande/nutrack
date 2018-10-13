const app = new App();

document.addEventListener('DOMContentLoaded', () => {
app.attachEventListeners();
app.adapter.fetchIngredients().then(app.createIngredients);
});

app.adapter.fetchIngredients()
    .then(json=>{
    json.forEach(ingredient => {
      document.querySelector('#ingredients-list').innerHTML += new Ingredient(ingredient).renderListItem();
    });
alert('LOADED');
});
const endPoint = 'http://localhost:3000/ingredients'
fetch(endPoint)
  .then(res => res.json())
  .then(json => {
    json.forEach(ingredient => {
      const newIngredient = new Ingredient(ingredient);
      document.querySelector('#ingredients-list').innerHTML += newIngredient.renderListItem();
    });

  });
