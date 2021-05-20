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
let listOfRecipes = document.getElementById("recepty")
let recipe;
let searchEl = document.getElementById("hledat") //not button, but search form
let index;
let categoryInput = document.getElementById("kategorie")

for (index = 0; index < recepty.length; index++) {
    recipe = recepty[index]
    createListItem(recipe)
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

searchEl.addEventListener("input", searchRecipe);

function searchRecipe() {
    listOfRecipes.innerHTML = " "
    
    for (index = 0; index < recepty.length; index++) {
        recipe = recepty[index];
        let recipeUpperCase = recipe.nadpis.toUpperCase();
        let searchUpperCase = searchEl.value.toUpperCase();
        let position = recipeUpperCase.search(searchUpperCase)
        
        if (position >= 0) {
            createListItem(recipe) 
        } else {
            console.log("zadna shoda")
        }
    }
}

categoryInput.addEventListener("input", categoryFilter)

function categoryFilter() {
    listOfRecipes.innerHTML = " "
    console.log(categoryInput.value)
    for (index = 0; index < recepty.length; index++) {
        recipe = recepty[index];
        if (categoryInput.value == recipe.stitek) {
            createListItem(recipe) 
        } else {
            console.log("zadna shoda")
        }
    }
}