/* Importation des données du fichier `recipes.js` dans la variable `recipes`. */
import recipes from "./data/recipes.js";

// console.log(recipes);

/**
 * Il prend un objet recette et renvoie un élément div avec les informations de la recette.
 * @param data - l'objet de données que vous souhaitez utiliser pour créer la carte
 * @returns Un élément div avec la classe col-md-4 col-sm-6 pb-4.
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
}
/* Création d'une carte pour chaque recette dans le tableau des recettes. */
const cardlist = document.querySelector(".cardlist");
const ingredientslist = document.querySelector(".list__ingredients");
const noresult = document.createElement("div");
noresult.innerText = "Aucune recette ne correspond à votre critère...";
const tags = {
    list__ingredients: [],
    list__appareils: [],
    list__ustensiles: [],
};
/**
 * Si le tableau de données est vide, ajoutez le message d'absence de résultat à la liste des cartes,
 * sinon, pour chaque élément du tableau de données, ajoutez une carte à la liste des cartes.
 * @param data - le tableau d'objets que vous souhaitez afficher
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

/**
 * Il prend un tableau d'objets, parcourt chaque objet, puis parcourt le tableau d'ingrédients de
 * chaque objet, puis pousse chaque ingrédient vers un nouveau tableau, puis supprime les doublons du
 * nouveau tableau, puis parcourt le nouveau tableau et crée un élément de liste pour chaque
 * ingrédient.
 * @param data - le tableau d'objets
 */

function addIngredienttoDom(data) {
    ingredientslist.innerHTML = "";
    const tableIng = [];

    data.forEach((el) => {
        el.ingredients.forEach((ing) => {
            tableIng.push(ing.ingredient.toLowerCase().trim());
        });
    });
    const finalTable = [...new Set(tableIng)];
    finalTable.forEach((ing) => {
        const ingredient = document.createElement("li");
        ingredient.innerHTML = ing;
        // Click to Tag
        ingredient.addEventListener("click", (e) => {
            addTag(e);
        });

        ingredientslist.appendChild(ingredient);
    });
}

/**
 * Il prend un tableau d'objets, parcourt le tableau et crée un nouveau tableau de valeurs uniques à
 * partir de la propriété "appliance" de chaque objet.
 * @param data - [{
 */
const appareilslist = document.querySelector(".list__appareils");

function addAppareiltoDom(data) {
    appareilslist.innerHTML = "";
    const tableApp = [];

    data.forEach((el) => {
        tableApp.push(el.appliance.toLowerCase());
    });

    const finalTableApp = [...new Set(tableApp)];
    finalTableApp.forEach((el) => {
        const appereils = document.createElement("li");
        appereils.innerHTML = el;
        appereils.addEventListener("click", (e) => {
            addTag(e);
        });
        appareilslist.appendChild(appereils);
    });
}

/**
 * Il prend un tableau d'objets, parcourt chaque objet, puis parcourt le tableau d'ustensiles de chaque
 * objet, puis pousse chaque ustensile vers un nouveau tableau, puis supprime les doublons du nouveau
 * tableau, puis parcourt le nouveau tableau et crée un nouvel élément de liste pour chaque ustensile.
 * @param data - un tableau d'objets
 */
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
    finalTableUst.forEach((ust) => {
        const ustensiles = document.createElement("li");
        ustensiles.innerHTML = ust;
        ustensiles.addEventListener("click", (e) => {
            addTag(e);
        });
        ustensileslist.appendChild(ustensiles);
    });
}

/**
 * Étant donné un texte de recherche, filtrez le tableau des recettes et renvoyez le tableau filtré
 * @param searchtxt - Le texte à rechercher.
 */
function filterCards(searchtxt) {
    const result = recipes.filter((a) => {
        const title = a.name.toLowerCase();
        const appliance = a.appliance.toLowerCase();

        /* Vérifier si le titre inclut le searchtxt. */
        const titleResult = title.includes(searchtxt);

        /* Vérifier si l'appliance inclut le searchtxt. */
        const applianceResult = appliance.includes(searchtxt);

        /* Filtrer le tableau des ingrédients de chaque objet du tableau et renvoyer la longueur du tableau filtré. */
        const ingResult = filterIngredients(a, searchtxt);

        /* Filtrer le tableau des ustensiles de chaque objet du tableau et renvoyer la longueur du tableau filtré. */
        const ustResult = filterUstensiles(a, searchtxt);

        /* Renvoie une valeur booléenne. */
        return titleResult || applianceResult || ingResult || ustResult;
    });
    addCardstoDom(result);
}

/**
 * Il filtre le tableau des ingrédients de chaque objet du tableau et renvoie la longueur du tableau
 * filtré.
 * @param a - l'objet que vous recherchez
 * @param searchtxt - le texte que vous recherchez
 * @returns La longueur du tableau des ingrédients qui correspondent au searchtxt.
 */
function filterIngredients(a, searchtxt) {
    return a.ingredients.filter((data) => {
        const ing = data.ingredient.toLowerCase();
        return ing.includes(searchtxt);
    }).length;
}

/**
 * Si le texte recherché est trouvé dans le tableau ustensils, renvoie la longueur du tableau.
 * @param a - l'objet que vous recherchez
 * @param searchtxt - le texte que vous recherchez
 * @returns La longueur du tableau des ustensiles qui correspondent au searchtxt.
 */
function filterUstensiles(a, searchtxt) {
    return a.ustensils.filter((ustensil) => {
        const ust = ustensil.toLowerCase();
        return ust.includes(searchtxt);
    }).length;
}

/* Écoute d'un événement keyup sur la barre de recherche. Si la longueur de la barre de recherche est
supérieure à 2, elle appellera la fonction filterCards. Si la longueur de la barre de recherche est
inférieure à 2, elle appellera la fonction addCardstoDom. */
const searchBar = document.querySelector(".input-theme");

searchBar.addEventListener("keyup", (e) => {
    if (e.target.value.length > 2) {
        const searchtxt = e.target.value.toLowerCase();
        filterCards(searchtxt);
    } else {
        addCardstoDom(recipes);
    }
});

/* Appel des fonctions pour ajouter les cartes au DOM. */
addCardstoDom(recipes);
addIngredienttoDom(recipes);
addAppareiltoDom(recipes);
addUstensiletoDom(recipes);

/* Fonction utilisée pour modifier la largeur du menu déroulant lorsqu'il est cliqué. */
const dropdowns = document.querySelectorAll(".dropdown-toggle");

dropdowns.forEach((el) => {
    el.addEventListener("show.bs.dropdown", function(el) {
        const inputEl = el.target.querySelector(".input-drop");
        const dropdmenus = document.querySelector(el.target.id);
        inputEl.style.width = "542px";

        setTimeout(() => {
            dropdmenus.style.opacity = "1";
        }, 10);
    });

    el.addEventListener("hide.bs.dropdown", function(el) {
        const inputEl = el.target.querySelector(".input-drop");
        const dropdmenus = document.querySelector(el.target.id);
        inputEl.style.width = "170px";
        dropdmenus.style.opacity = "0";
    });
});

const list2class = {
    list__ingredients: "tagIng",
    list__appareils: "tagApp",
    list__ustensiles: "tagUst",
};
/**
 * La fonction s'appelle addTag et prend un événement en paramètre. La fonction crée ensuite une
 * variable appelée tagsContent et l'affecte à l'élément avec l'id de tagsItem. La fonction crée
 * ensuite une variable appelée tagText et l'affecte au textContent du currentTarget de l'événement. La
 * fonction crée ensuite une variable appelée liElement et l'affecte à un nouvel élément d'élément de
 * liste. La fonction attribue ensuite le textContent du liElement au tagText. La fonction ajoute
 * ensuite le liElement au tagsContent. La fonction pousse ensuite le tagText dans le tableau de
 * balises. La fonction s'appelle alors elle-même.
 * @param e - l'objet événement
 */
function addTag(e) {
    const tagsContent = document.querySelector(".newTags");
    const tagText = e.target.textContent;
    const tagType = e.target.parentNode.classList[0];
    console.log(tagType);

    if (tags[tagType].indexOf(tagText) === -1) {
        const liElement = document.createElement("li");
        liElement.setAttribute("class", list2class[tagType]);

        liElement.innerHTML = `${tagText} <i class="far fa-times-circle"></i>`;
        liElement.querySelector(".far").addEventListener("click", (e) => {
            liElement.remove();
            const index = tags[tagType].indexOf(tagText);
            tags[tagType].splice(index, 1);
        });
        tagsContent.appendChild(liElement);
        tags[tagType].push(tagText.toLowerCase());
        console.log(tags);
    }
}