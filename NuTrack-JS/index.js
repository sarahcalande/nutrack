document.addEventListener('DOMContentLoaded', () => {
  const ingredientsURL = 'http://localhost:3000/ingredients';
  let consumedItems = document.querySelector('#consumed-items');
  let myTable = document.querySelector('#myTable');
  let mySearch = document.querySelector('#mySearch');

  init();

  function init() {
    let yourName = '';
    while (yourName === '') {
      yourName = prompt("What's your name?");
    }

    let title = `${yourName}'s Daily Food Blog`;
    let date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDay();
    let year = date.getFullYear();
    date = `${month}/${day}/${year}`
    document.querySelector('#your-name').innerText = title;
    document.querySelector('#todays-items-heading').innerText = `${date}`
    fetchIngredients();
  }

  function fetchIngredients() {
    return fetch(ingredientsURL)
      .then(r => r.json())
      .then(renderIngredients)
  }

  function renderIngredients(ingredientsArray) {
    ingredientsArray.forEach(ingredient => {
      let tr = document.createElement('tr');
      tr.dataset.id = ingredient.id;
      tr.innerHTML = `<td>${ingredient.name}</td><td>${ingredient.measure}</td><td><input type="number" min=1 max=100></td><td><button>Add</button></td>`;
      myTable.append(tr);
    });
  }

  mySearch.addEventListener('keyup', () => {
    let filter, table, tr, td, i;
    // input = document.getElementById("mySearch");
    filter = mySearch.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  })

  document.querySelector('#myTable').addEventListener('click', () => {
    if (event.target.nodeName === 'BUTTON') {
      let li = document.createElement('li')
      let id = event.target.parentElement.parentElement.dataset.id
      li.dataset.id = id
      let item = event.target.parentElement.parentElement.children[0].innerText;
      let quantity = event.target.parentElement.parentElement.children[2].children[0].value;
      String.prototype.isNumber = function(){return /^\d+$/.test(this);}
      if (quantity.isNumber()) {
        li.innerHTML = `<span>${item} --</span> <span class="quantity">${quantity}</span> servings <button>Delete</button>`
        consumedItems.append(li)
        consumedItems.style.backgroundColor = "white"
        event.target.parentElement.parentElement.children[2].children[0].value = '';

        addNutritionalProfile(id, quantity)
      }
    }
  });

  function addNutritionalProfile(id, quantity) {
    fetch(`${ingredientsURL}/${id}`)
      .then(r => r.json())
      .then(r => {
        r['ingredient_nutrients'].forEach(nutrient => {
          let value = parseFloat(nutrient.value)
          let tableRow = document.getElementById(`${nutrient.nutrient_id}`)
          tableRow.children[2].innerText = Math.round((parseFloat(tableRow.children[2].innerText) + value * quantity) * 1000) / 1000;
          let currentValue = parseFloat(tableRow.children[2].innerText);
          let allowedValue = parseFloat(tableRow.children[1].innerText);
          let percentage = Math.round((currentValue * 100) / allowedValue)
          tableRow.children[3].children[0].innerText = percentage
          if (percentage >= 0 && percentage <= 100) {
            tableRow.children[3].children[0].style.width = `${percentage}%`;
          } else {
            tableRow.children[3].children[0].style.width = '100%'
          }
          if (percentage >= 75 && percentage <= 125) {
            tableRow.children[3].children[0].style['background-color']='lime'
            let span = document.createElement('span')
            // let divImage = document.createElement('div')
            // divImage.backgroundColor = "black"
            let num = Math.floor(Math.random() * 6)
            span.innerHTML = `<img id='vitamin' src = "${num}.gif" >`
            // tdimage.appendChild(divImage)
            tableRow.appendChild(span)


          } else if (percentage >= 50 && percentage <= 150) {
            tableRow.children[3].children[0].style['background-color']='orange'
          } else {
            tableRow.children[3].children[0].style['background-color']='red'

          }
        })
      })
  }

  consumedItems.addEventListener('click', () => {
    if (event.target.nodeName === 'BUTTON') {
      let id = event.target.parentElement.dataset.id;
      let quantity = event.target.previousSibling.previousSibling.innerText
      event.target.parentElement.remove();

      removeNutritionalProfile(id, quantity)
    }
  })

  function removeNutritionalProfile(id, quantity) {
    fetch(`${ingredientsURL}/${id}`)
      .then(r => r.json())
      .then(r => {
        r['ingredient_nutrients'].forEach(nutrient => {
          let name = nutrient.nutrients
          let value = parseFloat(nutrient.value)
          let tableRow = document.getElementById(`${nutrient.nutrient_id}`)
          tableRow.children[2].innerText = Math.round((parseFloat(tableRow.children[2].innerText) - value * quantity) * 1000) / 1000
          let currentValue = parseFloat(tableRow.children[2].innerText);
          let allowedValue = parseFloat(tableRow.children[1].innerText);
          let percentage = Math.round((currentValue * 100) / allowedValue)
          tableRow.children[3].children[0].innerText = percentage
          if (percentage >= 0 && percentage <= 100) {
            tableRow.children[3].children[0].style.width = `${percentage}%`;
          } else {
            tableRow.children[3].children[0].style.width = '100%'
          }
          if (percentage >= 75 && percentage <= 125) {
            tableRow.children[3].children[0].style['background-color']='lime'
          } else if (percentage >= 50 && percentage <= 150) {
            tableRow.children[3].children[0].style['background-color']='orange'
          } else {
            tableRow.children[3].children[0].style['background-color']='red'
          }
        })
      })
  }

})
