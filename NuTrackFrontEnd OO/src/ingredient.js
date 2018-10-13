class Ingredient {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.content = data.content;
    this.nutrients = data.nutrients;
    Ingredient.all.push(this);
  }


renderNutrient(nutrients){
    return nutrients.map((nutrient) => `<li>${nutrient.name}</li>`).join('')
  }

  renderListItem() {
    return `
    <li>
      <h3>${this.name}
      <ul> ${this.renderNutrient(this.nutrients)} </ul>
        <button data-id=${this.id}>edit</button>
      </h3>
    </li>`;
    }

  static findById(id) {
    return this.all.find(ingredient => ingredient.id === id);
  }



renderUpdateForm() {
  return `
  <form data-id=${this.id}>
    <label>Title</label>
    <p>
      <input type="text" value="${this.name}" />
    </p>
    <label>Content</label>
    <p>
      <textarea>${this.content}</textarea>
    </p>
    <button type='submit'>Save Ingredient</button>
  </form>
`;
}


update({ name, content }) {
  this.name = name;
  this.content = content;
}



}

Ingredient.all = [];
