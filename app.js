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
let recipeDiv;
let searchEl = document.getElementById("hledat") ;//not button, but search form
let index;
let categoryEl = document.getElementById("kategorie");
let listOfIndexes = [];
let ratingEl = document.getElementById("razeni");

addEventListener("load", createList)
recipeDiv.addEventListener("click", recipeDetail)

function createList() {
    for (index = 0; index < recepty.length; index++) {
        recipe = recepty[index]
        createListItem(recipe)
        //listOfIndexes.push(index);
    }
}

function createListItem(item) {
    recipeDiv = document.createElement("div");
    recipeDiv.className = "recept"; //eventListener on click
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
}

function recipeDetail() {
    
}

searchEl.addEventListener("input", searchRecipe);

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

function sortByRating() {
    if (ratingEl.value == 1) {
        listOfRecipes.innerHTML = "";
        recepty.sort(function(a, b){return b.hodnoceni - a.hodnoceni});
        
        console.log(recepty)
        createList()
        
    } else if (ratingEl.value == 2) {
        listOfRecipes.innerHTML = "";
        recepty.sort(function(a, b){return a.hodnoceni - b.hodnoceni});
        
        console.log(recepty)
        createList()
    } else {
        listOfRecipes.innerHTML = "";
        createList()
    }     
}


