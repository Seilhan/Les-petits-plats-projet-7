/* Importation des données du fichier `recipes.js` dans la variable `recipes`. */
import recipes from "./data/recipes.js";

/**
 * Créez un élément de carte, ajoutez la classe `cardlist`, ajoutez la liste des ingrédients et renvoyez la carte
 * élément
 * @param data - L'objet de données qui est passé à la fonction.
 * @returns Un élément div avec une classe de cardlist.
 */

function buildCard(data) {
    const cardElement = document.createElement("div");
    cardElement.setAttribute("class", "col-md-4 col-sm-6 pb-4");

    cardElement.innerHTML = ` <div class="card" tabindex="0">
    <img class="card-img-top" alt="" />
    <div class="card-body">
        <div class="d-flex flex-row mb-3 justify-content-between gap-2">
            <h2 class="card-title">${data.name}</h2>
            <div class="col-4 d-flex flex-row align-items-center justify-content-end">
                <i class="me-2 bi bi-clock"></i>
                <p class="card-subtitle">${data.time} min</p>
            </div>
        </div>
        <div class="d-flex">
            <ul class="col-6 ingredients">
            </ul>
            <p class="col-6 m-0 card-text">
            ${data.description}
            </p>
        </div>
    </div>
</div>`;
    const ingredients = cardElement.querySelector(".ingredients");
    data.ingredients.forEach((element) => {
        const ingredient = document.createElement("li");
        ingredient.innerHTML = `${element.ingredient} : ${element.quantity || ""} ${
      element.unit || ""
    }`;
        ingredients.appendChild(ingredient);
    });

    return cardElement;
};
/* Création d'une carte pour chaque recette dans le tableau des recettes. */
const cardlist = document.querySelector(".cardlist");
const ingredientslist = document.querySelector(".list__ingredients");
const noresult = document.createElement("div");
noresult.innerText = "Aucune recette ne correspond à votre critère...";

/**
 * Il prend les données de l'API et crée une carte pour chaque élément des données.
 * @param data - Les données à afficher dans la carte.
 */
function addCardstoDom(data) {
    cardlist.innerHTML = "";
    if (data.length == 0) {
        cardlist.appendChild(noresult);
    } else {
        data.forEach((el) => {
            const card = buildCard(el);
            cardlist.appendChild(card);
        });
    }
}

function addIngredienttoDom(data) {
    ingredientslist.innerHTML = "";
    const tableIng = [];

    data.forEach((el) => {
        el.ingredients.forEach((ing) => {
            tableIng.push(ing.ingredient.toLowerCase().trim());
        });
    });
    const finalTable = [...new Set(tableIng)];
    finalTable.forEach(ing => {
            const ingredient = document.createElement("li");
            ingredient.innerHTML = ing;
            ingredientslist.appendChild(ingredient);
    });
}

const appareilslist = document.querySelector(".list__appareils");

function addAppareiltoDom(data) {
    appareilslist.innerHTML = "";
    const tableApp = [];

    data.forEach((el) => {
        tableApp.push(el.appliance.toLowerCase());
        });
        
    const finalTableApp =  [...new Set(tableApp)];
    finalTableApp.forEach( el => {
        const appereils = document.createElement("li");
        appereils.innerHTML = el;
        appareilslist.appendChild(appereils);
        // console.log(el);
    });   
       
}
const ustensileslist = document.querySelector(".list__ustensiles");

function addUstensiletoDom(data) {
    ustensileslist.innerHTML = "";
    const tableUst = [];

    data.forEach((el) => {
        el.ustensils.forEach((ust) => {
            tableUst.push(ust.toLowerCase());
        });
    });
    const finalTableUst = [...new Set(tableUst)];
    finalTableUst.forEach(ust => {
            const ustensiles = document.createElement("li");
            ustensiles.innerHTML = ust;
            ustensileslist.appendChild(ustensiles);
    });
}
// function addUstensiletoDom(data) {
//     ustensileslist.innerHTML = "";
//     data.forEach((el) => {
//         el.ustensils.forEach((ust) => {
//             const ustensiles = document.createElement("li");
//             ustensiles.innerHTML = ust;
//             ustensileslist.appendChild(ustensiles);
//             // console.log(ust);
//         });
//     });
// }



/**
 * Étant donné un texte de recherche, filtrez le tableau des recettes et renvoyez le tableau filtré
 * @param searchtxt - Le texte à rechercher.
 */
function filterCards(searchtxt) {
    // TODO: filtrer par ingredients aussi
    const result = recipes.filter((a) => {
        const title = a.name.toLowerCase();
        return title.includes(searchtxt);
    });
   
    addCardstoDom(result);
    //TODO: 1: vider les ingredients du dom 2: addingredienttodom +result 
}

/* Le code qui permet de filtrer les recettes par le nom de la recette. */
const searchBar = document.querySelector(".input-theme");

searchBar.addEventListener("keyup", (e) => {
    if (e.target.value.length > 2) {
        const searchtxt = e.target.value.toLowerCase();
        filterCards(searchtxt);
    } else {
        addCardstoDom(recipes);
    }
});

// Creation de toutes les recettes
addCardstoDom(recipes);
addIngredienttoDom(recipes);
addAppareiltoDom(recipes);
addUstensiletoDom(recipes);


const dropdowns = document.querySelectorAll(".dropdown-toggle");

dropdowns.forEach(el => {
    el.addEventListener("show.bs.dropdown", function(el) {
            const inputEl = el.target.querySelector('.input-drop');
            const dropdmenus = document.querySelector(el.target.id);
        
                inputEl.style.width = "542px";
            setTimeout(() => {
                dropdmenus.style.opacity = "1";
            }, 10);
        });

    el.addEventListener("hide.bs.dropdown", function(el) {
        const inputEl = el.target.querySelector('.input-drop');
        const dropdmenus = document.querySelector(el.target.id);
            inputEl.style.width = "170px";
            dropdmenus.style.opacity = "0";
    });           
})

