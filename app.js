let listOfRecipes = document.getElementById("recepty");
let index;
let recipe;
let searchEl = document.getElementById("hledat");//not button, but search form on input
let categoryEl = document.getElementById("kategorie");
let ratingEl = document.getElementById("razeni");
let lastViewed;
let recipesArray = [];
let sortedRecipes;

addEventListener("load", onLoad);

/**
 * call createList with initial array from recepty.js
 * check for recipe value in localStorage and create detail display of it
 * if recipe in localStorage is undefined, use first object of array 
 */
function onLoad() {
    createList(recepty);
      
    let value = localStorage.getItem("recipe");
    if (value == null || value == undefined) {
        lastViewed = null;
        recipeDetailCreate(recepty[0]);
    } else {
        lastViewed = JSON.parse(value);
        recipeDetailCreate(lastViewed);
    }  
}

/**
 * loop through the array and create list of items by calling createListItem()
 * @param {Array} arr 
 */
function createList(arr) {
    
    for (index = 0; index < arr.length; index++) {
        recipe = arr[index];
        createListItem(recipe);  
    }
}

/**
 * create one item for list in <div id="recepty">
 * add eventListener to the recipe item
 * @param {object} item 
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
 * saves the recipeObject as JSON to localStorage
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
 * loop through the array recepty and check for the event target
 * display the event target detailed info by calling recipeDetailCreate
 * @param {Event} event 
 */
function recipeDetailDisplay(event) {
    for (index = 0; index < recepty.length; index++) {
        recipe = recepty[index];
        if (event.target.innerText == recipe.nadpis) {
            recipeDetailCreate(recipe);
        }
    }
}

searchEl.addEventListener("input", searchRecipe);
categoryEl.addEventListener("input", searchRecipe);

/**
 * check for the value of input in searchEl and categoryEl
 * loop through the array recepty, if all conditions are True, push recipe object to recipesArray
 * call createList with recipesArray as param, or when all conditions are False, display empty list
 * check nadpis property of objects in array for searchEl
 * check stitek property of objects in array for categoryEl
 */
function searchRecipe() {
    if (searchEl.value == 0 && categoryEl.value == 0){
        listOfRecipes.innerHTML = " ";
        recipesArray = [];
        createList(recepty);   
    } else if (searchEl.value != 0 && categoryEl.value == 0) {
        listOfRecipes.innerHTML = " ";
        recipesArray = [];

        for (index = 0; index < recepty.length; index++) {
            recipe = recepty[index];
            let recipeUpperCase = recipe.nadpis.toUpperCase();
            let searchUpperCase = searchEl.value.toUpperCase();
            let position = recipeUpperCase.search(searchUpperCase);
            
            if (position >= 0) {
                recipesArray.push(recipe);  
            }    
        }
        
        if (recipesArray.length == 0) {
            listOfRecipes.innerHTML = " "; 
        } else {
            createList(recipesArray);
        }
    } else if (searchEl.value != 0 && categoryEl.value != 0) {
        listOfRecipes.innerHTML = " ";
        recipesArray = [];

        for (index = 0; index < recepty.length; index++) {
            recipe = recepty[index];
            console.log(recipe);
            let recipeUpperCase = recipe.nadpis.toUpperCase();
            let searchUpperCase = searchEl.value.toUpperCase();
            let position = recipeUpperCase.search(searchUpperCase);
           
            if (position >= 0 && categoryEl.value == recipe.stitek) {
                recipesArray.push(recipe);
            }
        } 

        if (recipesArray.length == 0) {
            listOfRecipes.innerHTML = " "; 
        } else {
            createList(recipesArray);
        }   
    } else if (categoryEl.value != 0 && searchEl.value == 0) {
        listOfRecipes.innerHTML = " ";
        recipesArray = [];

        for (index = 0; index < recepty.length; index++) {
            recipe = recepty[index];
            if (categoryEl.value == recipe.stitek) {
                recipesArray.push(recipe);
            }
        }   
        createList(recipesArray);    
    }
}

ratingEl.addEventListener("input", sortByRating);

/**
 * create deep copy of arrays (with JSON) to be sorted, to use them to sort by default
 * check for ratingEl value
 * sort sortedRecipes array by property hodnoceni
 * hodnoceni ranges from 1 to 5, where 5 is the highest
 */
function sortByRating() { 
    
    if (recipesArray.length == 0) {
        sortedRecipes = JSON.parse(JSON.stringify(recepty));
    } else {
        sortedRecipes = JSON.parse(JSON.stringify(recipesArray));
    }

    if (ratingEl.value == 1) {
        listOfRecipes.innerHTML = "";
        sortedRecipes.sort(function(a, b){return b.hodnoceni - a.hodnoceni}); //best rated to worst rated
        createList(sortedRecipes); 
         
    } else if (ratingEl.value == 2) {
        listOfRecipes.innerHTML = "";
        sortedRecipes.sort(function(a, b){return a.hodnoceni - b.hodnoceni}); //worst rated to best rated
        createList(sortedRecipes); 
          
    } else if (ratingEl.value == 0) {
        listOfRecipes.innerHTML = "";
        if (recipesArray.length == 0) {
            createList(recepty);
        } else {
            createList(recipesArray);
        }
    }  
}