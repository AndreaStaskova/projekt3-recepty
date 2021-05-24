/*
Co je za úkol v tomto projektu:

1) Do prvku s id="recepty" vygeneruj z dat seznam všech receptů z naší "databáze".
HTML vzor, jak vygenerovaný recept vypadá, je zakomentovaný v index.html.

2) Doplň hledání - v hlavičce odkomentuj pole pro hledání. Pri kliknutí na tlačítko Hledat
by se měl seznam receptů vyfiltrovat podle hledaného slova.

3) Doplň filtrovanání receptů podle kategorie.

4) Doplň řazení receptů podle hodnocení.

5) Na recepty v seznamu by mělo jít kliknout a na pravé polovině, se objeví detail receptu.
Doplň patričné údaje receptu do HTML prvků s ID recept-foto, recept-kategorie,
recept-hodnoceni, recept-nazev, recept-popis.

6) Poslední vybraný recept ulož do Local Storage, aby se při novém otevření aplikace načetl.
*/
let listOfRecipes = document.getElementById("recepty");
let recipe;
let searchEl = document.getElementById("hledat") ;//not button, but search form
let index;
let categoryEl = document.getElementById("kategorie");
let listOfIndexes = [];
let ratingEl = document.getElementById("razeni");
let lastViewed

addEventListener("load", createList);

/**
 * loops through the array in recepty.js and creates list of items by createListItem()
 * checks for recipe value in localStorage and creates detail display of it
 * if recipe in LS is undefined, creates detail display of first object of array 
 */
function createList() {
    for (index = 0; index < recepty.length; index++) {
        recipe = recepty[index];
        createListItem(recipe);
        
        //listOfIndexes.push(index);
    }

    let value = localStorage.getItem("recipe");
    console.log(value)
    if (value == null || value == undefined) {
        lastViewed = null
        recipeDetailCreate(recepty[0]);
    } else {
        lastViewed = JSON.parse(value);
        console.log(lastViewed)
        recipeDetailCreate(lastViewed);
    }  
}

/**
 * creates one item for list in <div id="recepty">
 * adds eventListener to the recipe item
 * @param {object} item from recepty in recepty.js
 */
function createListItem(item) {
    let recipeDiv = document.createElement("div");
    recipeDiv.className = "recept"; 
    listOfRecipes.appendChild(recipeDiv);
    let recipeListPicture = document.createElement("div");
    recipeListPicture.className = "recept-obrazek";
    recipeDiv.appendChild(recipeListPicture);
    let pictureList = document.createElement("img");
    pictureList.src = item.img;
    recipeListPicture.appendChild(pictureList);
    let recipeNameDiv = document.createElement("div");
    recipeNameDiv.className = "recept-info";
    recipeDiv.appendChild(recipeNameDiv);
    let recipeName = document.createElement("h3");
    recipeName.innerHTML = item.nadpis;
    recipeNameDiv.appendChild(recipeName);

    recipeDiv.addEventListener("click", recipeDetailDisplay);
}

/**
 * loads values from recipeObject to HTML div element with class="recept-detail-info"
 * saves the object as JSON to localStorage
 * @param {object} recipeObject 
 */
function recipeDetailCreate(recipeObject) {
    document.getElementById("recept-foto").src = recipeObject.img;
    document.getElementById("recept-foto").alt = recipeObject.nadpis;
    document.getElementById("recept-hodnoceni").innerHTML = recipeObject.hodnoceni;
    document.getElementById("recept-kategorie").innerHTML = recipeObject.kategorie;
    document.getElementById("recept-nazev").innerHTML = recipeObject.nadpis;
    document.getElementById("recept-popis").innerHTML = recipeObject.popis;
    localStorage.recipe = JSON.stringify(recipeObject);
}

/**
 * loops through the array recepty and checks for the event target
 * displays the event target detailed information by calling recipeDetailCreate
 * @param {*} event 
 */
function recipeDetailDisplay(event) {
    for (index = 0; index < recepty.length; index++) {
        recipe = recepty[index];
        if (event.target.innerText == recipe.nadpis) {
            recipeDetailCreate(recipe)
        }
    }
}

searchEl.addEventListener("input", searchRecipe);

/**
 * search engine for recepty array
 * checks nadpis property of objects in array
 */
function searchRecipe() {
    categoryEl.value = ""
    listOfRecipes.innerHTML = " ";
/*
    listOfIndexes.forEach(ele => {
        recipe = recepty[ele];
        let recipeUpperCase = recipe.nadpis.toUpperCase();
        let searchUpperCase = searchEl.value.toUpperCase();
        let position = recipeUpperCase.search(searchUpperCase);
        
        if (position >= 0) {
            createListItem(recipe) ;
        } else {
            //
            console.log("zadna shoda");
        }
    });
   */
    for (index = 0; index < recepty.length; index++) {
        recipe = recepty[index];
        let recipeUpperCase = recipe.nadpis.toUpperCase();
        let searchUpperCase = searchEl.value.toUpperCase();
        let position = recipeUpperCase.search(searchUpperCase);
        //listOfIndexes.splice(0, listOfIndexes.length)
        if (position >= 0) {
            createListItem(recipe);
            if (listOfIndexes.includes(index) == false) {
                listOfIndexes.push(index);
            }
            console.log(listOfIndexes);
            
            
        } else {
            //console.log("not this: " + index);
            listOfIndexes.splice(index, 1)
            
        }
    }
}

categoryEl.addEventListener("input", categoryFilter);

/**
 * filters recipes in recepty array by property stitek
 */
function categoryFilter() {
    if (categoryEl.value == "") {
        listOfRecipes.innerHTML = " ";
        createList()
    } else {
        listOfRecipes.innerHTML = " ";
        for (index = 0; index < recepty.length; index++) {
            recipe = recepty[index];
            if (categoryEl.value == recipe.stitek) {
                createListItem(recipe) ;  
            }
        }
    }
}


function filter() {
//metoda filter for array
  }

ratingEl.addEventListener("input", sortByRating);

/**
 * sorts listOfRecipes by property hodnoceni
 */
function sortByRating() {
    if (ratingEl.value == 1) {
        listOfRecipes.innerHTML = "";
        recepty.sort(function(a, b){return b.hodnoceni - a.hodnoceni});
        createList()
    } else if (ratingEl.value == 2) {
        listOfRecipes.innerHTML = "";
        recepty.sort(function(a, b){return a.hodnoceni - b.hodnoceni});
        createList()
    } else {
        listOfRecipes.innerHTML = "";
        createList()
    }     
}


