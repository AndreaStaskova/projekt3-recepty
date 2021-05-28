/*
Co je za úkol v tomto projektu:

2) Doplň hledání - v hlavičce odkomentuj pole pro hledání. Pri kliknutí na tlačítko Hledat
by se měl seznam receptů vyfiltrovat podle hledaného slova.

3) Doplň filtrovanání receptů podle kategorie.

4) Doplň řazení receptů podle hodnocení.

VYLEPŠIT KOMBINACI HLEDÁNÍ, FILTROVÁNÍ A ŘAZENÍ
*/
let listOfRecipes = document.getElementById("recepty");
let recipe;
let searchEl = document.getElementById("hledat");//not button, but search form
let index;
let categoryEl = document.getElementById("kategorie");
let listOfIndexes = [];
let ratingEl = document.getElementById("razeni");
let lastViewed;
let recipesArray = [];


addEventListener("load", onLoad);

/**
 * loops through the array in recepty.js and creates list of items by createListItem()
 * checks for recipe value in localStorage and creates detail display of it
 * if recipe in LS is undefined, creates detail display of first object of array 
 */
function onLoad() {
    createList()
      
    let value = localStorage.getItem("recipe");
    if (value == null || value == undefined) {
        lastViewed = null;
        recipeDetailCreate(recepty[0]);
    } else {
        lastViewed = JSON.parse(value);
        recipeDetailCreate(lastViewed);
    }  
}

function createList() {
    
    if (recipesArray.length == 0) {
        currentList = recepty;
    } else {
        currentList = recipesArray;
    }

    for (index = 0; index < currentList.length; index++) {
        recipe = currentList[index];
        createListItem(recipe);
        
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

/**
 * TBD
 * search engine for recepty array
 * checks nadpis property of objects in array
 */
function searchRecipe() {
    //categoryEl.value = "";
    //listOfRecipes.innerHTML = " ";
    //console.log("zacatek vyhledavani: ", recipesArray)
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
    if (searchEl.value == 0 & categoryEl.value == 0){
        listOfRecipes.innerHTML = " ";
        //tenhle for bude zbytečný, až bude fungovat přidávání do recipesArray
        //createList() místo něj
        /*
        for (index = 0; index < recepty.length; index++) {
            recipe = recepty[index];
            let recipeUpperCase = recipe.nadpis.toUpperCase();
            let searchUpperCase = searchEl.value.toUpperCase();
            let position = recipeUpperCase.search(searchUpperCase);
            
            if (position >= 0) {
                createListItem(recipe);
                recipesArray.push(recipe);
                
            }
        }*/
        recipesArray = [];
        createList();   
    } else if (searchEl.value != 0 & categoryEl.value == 0) {
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
            createList();
        }
    } else if (searchEl.value != 0 & categoryEl.value != 0) {
        listOfRecipes.innerHTML = " ";
        for (index = 0; index < recipesArray.length; index++) {
            recipe = recipesArray[index];
            let recipeUpperCase = recipe.nadpis.toUpperCase();
            let searchUpperCase = searchEl.value.toUpperCase();
            let position = recipeUpperCase.search(searchUpperCase);
            
            if (position < 0) {
                recipesArray.splice(index, 1);  
            }
        createList();
        }
    } 
}

categoryEl.addEventListener("input", categoryFilter);

/**
 * filters recipes in recepty array by property stitek
 * filter method???
 */
function categoryFilter() {
    console.log(recipesArray.length)
    if (categoryEl.value == 0 & searchEl.value == 0) {
        listOfRecipes.innerHTML = " ";
        recipesArray = [];
        console.log(recipesArray.length)
        createList();
    } else if (categoryEl.value != 0 & searchEl.value == 0) {
        listOfRecipes.innerHTML = " ";
        recipesArray = [];
        let category = categoryEl.value
        recipesArray = recepty.filter(filterItems(recepty, category))
        /*
        for (index = 0; index < recepty.length; index++) {
            recipe = recepty[index];
            if (categoryEl.value == recipe.stitek) {
                console.log(recipesArray.includes(recipe))
                recipesArray.push(recipe);
            }
        }
        */
        console.log(recipesArray.length)
        createList();    
    } else if (categoryEl.value != 0 & searchEl.value != 0){
        listOfRecipes.innerHTML = " ";
        /*
        if (recipesArray.length == 0) {
            listOfRecipes.innerHTML = " ";
            for (index = 0; index < recepty.length; index++) {
                recipe = recepty[index];
                if (categoryEl.value == recipe.stitek) {
                    recipesArray.push(recipe);
                }
            }
            console.log(recipesArray.length)
        } else {} */
        for (index = 0; index < recipesArray.length; index++) {
            recipe = recipesArray[index];
            if (categoryEl.value != recipe.stitek) {
                recipesArray.splice(index, 1);
            }
        }
        createList();
        console.log(recipesArray.length)        
    } 
    

}

function checkCategory(arr, categoryValue) {
    for (index=0; index<arr.length;index++){
        recipe = arr[index]
    }
    if (recipe.stitek == categoryValue){
        return true
    }
    
}
function filterItems(arr, categoryValue) {
    return arr.filter(function(el) {
        return el.stitek == categoryValue
        //return el.toLowerCase().indexOf(query.toLowerCase()) !== -1
    })
  }

ratingEl.addEventListener("input", sortByRating);

/**
 * sorts listOfRecipes by property hodnoceni
 */
function sortByRating() {
    
    if (ratingEl.value == 1) {
        listOfRecipes.innerHTML = "";
        sortedRecipes.sort(function(a, b){return b.hodnoceni - a.hodnoceni});
        createList();
    } else if (ratingEl.value == 2) {
        listOfRecipes.innerHTML = "";
        sortedRecipes.sort(function(a, b){return a.hodnoceni - b.hodnoceni});
        createList();
    } else {
        listOfRecipes.innerHTML = "";
        createList();
    }     
}