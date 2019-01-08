

document.addEventListener('DOMContentLoaded', () => {
  const ingredientsURL = 'http://localhost:3000/ingredients';
  const nutrientsURL = 'http://localhost:3000/nutrients';
  let consumedItems = document.querySelector('#consumed-items');
  let myTable = document.querySelector('#myTable');
  let mySearch = document.querySelector('#mySearch');





  init();

  function init() {
    let yourName = '';
    while (yourName === '') {
      yourName = prompt("What's your name?");
    }

    let title = `${yourName}'s Daily Nutrition`;
    let date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    date = `${month}/${day}/${year}`
    document.querySelector('#your-name').innerText = title;
    document.querySelector('#todays-items-heading').innerText = `${date}`
    fetchNutrients();
    fetchIngredients();
  }



  function fetchNutrients() {
    return fetch(nutrientsURL)
      .then(r => r.json())
      .then(r => r.forEach(nutrient => renderNutrients(nutrient)))
      .then(descriptionEvents)
  }


  //NUTRIENTS TABLEEEEE
  function renderNutrients(nutrient){
  let nutritiontable = document.querySelector('#nutrition-table')
  nutritiontable.innerHTML +=
  `<tr id=${nutrient.id}>
      <td id="vitamin" data-name = "${nutrient.name}" data-description="${nutrient.description}" data-suggestion="${nutrient.suggestion}">${nutrient.name}</td>
      <td>${nutrient.value} ${nutrient.unit}</td>
      <td>0</td>
      <td class="percentage" data-name = "${nutrient.name}" data-description="${nutrient.description}" data-suggestion="${nutrient.suggestion}"><span id = "${nutrient.name}1" style='background-color:#F88;display:block;width:0%'>0</span></td>
          <td data-id="${nutrient.id}" data-description=${nutrient.description}></td>
    </tr>`









  }

//FETCH AND RENDER INGREDIENTS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  function fetchIngredients() {
    return fetch(ingredientsURL)
      .then(r => r.json())
      .then(r => r.forEach(ingredient => renderIngredients(ingredient)))
  }

  function renderIngredients(ingredient) {
      let tr = document.createElement('tr');
      tr.dataset.id = ingredient.id;
      tr.innerHTML = `<td>${ingredient.name}</td><td>${ingredient.measure}</td><td><input type="number" min=1 max=100></td><td><button>Add</button></td>`;
      myTable.append(tr);
    };




//SEARCH!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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





//ADDING TO NUTRITIONAL PROFILE
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

////////////////////////////////////////////////////////////////////
//DONUT CHART


          let protein = document.querySelector("#Protein1").innerText
          let fat = document.getElementById('Total lipid (fat)1').innerText
          let carbs = document.getElementById('Carbohydrate1').innerText
          let canvas = document.getElementById("doughnut-chart")
          canvas.className = "unhide-chart"
                new Chart(canvas, {
                type: 'doughnut',
                data: {
                  labels: ["Fat", "Carbohydrates", "Protein"],
                  datasets: [
                    {
                      label: "Macronutrients",
                      backgroundColor: ["salmon", "lightblue","lightgreen"],
                      data: [fat, carbs, protein]
                    }
                  ]
                },
                options: {
                  title: {
                    display: true,
                    text: 'Macronutrients'
                  }
                }
                  });


/////////////////////////////////////////////////////////////////////////

          if (percentage >= 0 && percentage <= 100) {
            tableRow.children[3].children[0].style.width = `${percentage}%`;
          } else {
            tableRow.children[3].children[0].style.width = '100%'
          }
          if (percentage >= 50) {
            tableRow.children[3].children[0].style['background']='linear-gradient(to bottom, rgba(200,254,188,1) 0%,rgba(164,254,144,1) 45%,rgba(123,255,93,1) 100%)';
              tableRow.children[3].children[0].style['border-radius']= '15px'
            let span = document.createElement('span')
            // let divImage = document.createElement('div')
            // divImage.backgroundColor = "black"
            // let num = Math.floor(Math.random() * 6)
            // span.innerHTML = `<img id='vitamin' src = "${num}.gif" >`
            // tdimage.appendChild(divImage)
            tableRow.appendChild(span)
          } else if (percentage >= 25 && percentage <= 49) {
            tableRow.children[3].children[0].style['background']='linear-gradient(to bottom, rgba(254,233,188,1) 0%,rgba(254,219,144,1) 45%,rgba(255,204,93,1) 100%)';
              tableRow.children[3].children[0].style['border-radius']= '15px'
          } else {
            tableRow.children[3].children[0].style['background']='linear-gradient(to bottom, rgba(254,187,187,1) 0%,rgba(254,144,144,1) 45%,rgba(255,92,92,1) 100%)';
            tableRow.children[3].children[0].style['border-radius']= '15px'

          }
        })
      })

  }



//DELETING THINGS IN NUTRITIONAL PROFILE
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
          if (percentage >= 50) {
            tableRow.children[3].children[0].style['background-color']='lime'
          } else if (percentage >= 25 && percentage <= 49) {
            tableRow.children[3].children[0].style['background-color']='orange'
          } else {
            tableRow.children[3].children[0].style['background-color']='red'
          }
        })
      })
  }
})




  //SHOWING INFO ABOUT EACH NUTRIENT


function descriptionEvents(){

//SUGGESTIONS PROMPT
    let percent = document.querySelectorAll('.percentage')
        let inner = document.querySelector('#suggestioninner')
    percent.forEach(nutrient => nutrient.addEventListener('click', junk))
    function junk(e){
      console.log(inner)
    let header = document.querySelector('#secondheader')
    header.innerText = e.target.parentElement.dataset.name
    console.log(e.target.innerText)
        if (parseInt(e.target.innerText) < 75 && parseInt(e.target.innerText) > 50){
          inner.innerText = `Not bad, but not enough ${e.target.parentElement.dataset.name}`
        }
        else if (parseInt(e.target.innerText) >= 50 && parseInt(e.target.innerText)) {
          inner.innerText = `You're getting a good amount of ${e.target.parentElement.dataset.name}!
           Here are the benefits: ${e.target.parentElement.dataset.description}`
         } else if (parseInt(e.target.innerText) <= 50) {
              inner.innerText = `This is not enough ${e.target.parentElement.dataset.name}. Try ${e.target.parentElement.dataset.suggestion}.`
          }
        $('#suggestion')
          .modal('show')
        ;
}

    //make suggestions for food w/ highest content based on what was clicked




//CUSTOM FOOD PROMPT FORM
let addcustom = document.querySelector('#lookingfor')
addcustom.addEventListener('click', promptCustom)
function promptCustom(e){


  $('#promptmodal')
    .modal('show')
  ;



  //make a form and post the info to the back end and give option to save to table
      }

let modaldiv = document.querySelector('#promptmodal')
modaldiv.addEventListener('submit', submitfunction)

function submitfunction(e){
      e.preventDefault()


    let data =
    {
      name:   e.target.name.value,
      measure: e.target.measure.value
    }


    fetch('http://localhost:3000/ingredients', {
      method: "POST",
      headers:  {
    'Content-Type': 'application/json; charset=utf-8'
  },
      body: JSON.stringify(data)
    }).then(r=>r.json())
.then((ingredient) => {
  let tr = document.createElement('tr');
      tr.dataset.id = ingredient.id;
      tr.innerHTML = `<td>${ingredient.name}</td>
      <td>${ingredient.measure}</td>
      <td><input type="number" min=1 max=100></td>
      <td><button>Add</button></td>`;
      myTable.append(tr);}
    )


}


let clicknutrient = document.querySelectorAll('#vitamin')
clicknutrient.forEach(nutrient => nutrient.addEventListener('click', funk))
function funk(e){
  let header = document.querySelector('#firstheader')
  let descriptionpart = document.querySelector('.description')
    header.innerText = e.target.dataset.name
    console.log(e.target.descriptionpart);
  descriptionpart.innerText = e.target.dataset.description

$('#descriptionmodal')
.modal('show')
;

}



}
