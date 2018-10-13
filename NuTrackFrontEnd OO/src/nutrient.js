class Nutrient{
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    Nutrient.all.push(this);

}


Nutrient.all = []
