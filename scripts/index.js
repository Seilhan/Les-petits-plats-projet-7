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
    cardElement.setAttribute("class", "col-lg-4 col-md-6 col-sm-12");

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
        <div class="row">
          <div class="col-6">
            <ul class="ingredients">
            </ul>
            </div>
          <div class="col-6 m-0 card-text">
            ${data.description}
            </div>
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
    tagIng: [],
    tagApp: [],
    tagUst: [],
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
 * @param data - le tableau d'objets que je parcours en boucle
 * @param [search=null] - le terme de recherche
 */
function addIngredienttoDom(data, search = null) {
    ingredientslist.innerHTML = "";
    const tableIng = [];

    data.forEach((el) => {
        el.ingredients.forEach((ing) => {
            const indtoAdd = ing.ingredient.toLowerCase().trim();
            if (search) {
                if (indtoAdd.includes(search)) tableIng.push(indtoAdd);
            } else {
                tableIng.push(indtoAdd);
            }
        });
    });

    const finalTable = [...new Set(tableIng)];
    finalTable.forEach((ing) => {
        const ingredient = document.createElement("li");
        ingredient.innerHTML = ing;
        ingredient.addEventListener("click", (e) => {
            addTag(e);
        });
        ingredientslist.appendChild(ingredient);
    });
}

/**
 * Il prend un tableau d'objets et crée une liste de valeurs uniques à partir de la propriété
 * "appliance" de chaque objet.
 * @param data - les données de l'API
 * @param [search=null] - la valeur du champ de saisie
 */
const appareilslist = document.querySelector(".list__appareils");

function addAppareiltoDom(data, search = null) {
    appareilslist.innerHTML = "";
    const tableApp = [];

    data.forEach((el) => {
        const apptoAdd = el.appliance.toLowerCase();
        if (search) {
            if (apptoAdd.includes(search)) tableApp.push(apptoAdd);
        } else {
            tableApp.push(apptoAdd);
        }
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
 * Il prend un tableau d'objets, boucle à travers les objets, boucle à travers le tableau d'ustensiles
 * dans chaque objet et ajoute chaque ustensile à un nouveau tableau. Ensuite, il supprime les doublons
 * du nouveau tableau et ajoute chaque ustensile au DOM.
 * @param data - le tableau d'objets
 * @param [search=null] - la valeur de l'entrée
 */

const ustensileslist = document.querySelector(".list__ustensiles");

function addUstensiletoDom(data, search = null) {
    ustensileslist.innerHTML = "";
    const tableUst = [];

    data.forEach((el) => {
        el.ustensils.forEach((ust) => {
            const usttoAdd = ust.toLowerCase().trim();
            if (search) {
                if (usttoAdd.includes(search)) tableUst.push(usttoAdd);
            } else {
                tableUst.push(usttoAdd);
            }
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
 * Il filtre le tableau des recettes par le tableau des balises et renvoie un nouveau tableau de
 * recettes correspondant aux balises.
 * @param recipes - un tableau d'objets
 * @returns Un tableau d'objets.
 */

function filterCardsByTags(recipes) {
    const ingredients = tags.tagIng;
    const appliance = tags.tagApp;
    const ustensil = tags.tagUst;

    const findInIng =
        ingredients.length > 0 ?
        recipes.reduce((val1, val2) => {
            return val2.ingredients.filter((i) =>
                    ingredients.includes(i.ingredient.toLowerCase())
                ).length === ingredients.length ?
                [...val1, val2] :
                val1;
        }, []) :
        recipes;

    const findApp =
        appliance.length > 0 ?
        findInIng.reduce((val1, val2) => {
            return appliance.includes(val2.appliance.toLowerCase()) ?
                [...val1, val2] :
                val1;
        }, []) :
        findInIng;

    const findUst =
        ustensil.length > 0 ?
        findApp.reduce((val1, val2) => {
            return val2.ustensils.filter((i) =>
                    ustensil.includes(i.toLowerCase())
                ).length === ustensil.length ?
                [...val1, val2] :
                val1;
        }, []) :
        findApp;

    return findUst;
}

function getFilteredData(searchtxt) {
  const searchRes= [];
  
  if(searchtxt) {
  for (let index = 0; index < recipes.length; index++) {
    const a = recipes[index];
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

    if (titleResult || applianceResult || ingResult || ustResult) searchRes.push(a);
    }
    return searchRes;
  }
  return recipes;
}

/**
 * Il prend un texte de recherche, filtre les données par ce texte, puis filtre les données par
 * balises, puis ajoute les données filtrées au DOM.
 * @param searchtxt - le texte que l'utilisateur a saisi dans le champ de recherche
 */

function filterCards(searchtxt) {
    const searchfilter = getFilteredData(searchtxt);

    const finalFilter = filterCardsByTags(searchfilter);

    addCardstoDom(finalFilter);
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

/* Écoute d'un événement keyup sur la barre de recherche. Si la longueur de l'entrée est supérieure à
2, il filtrera les cartes en fonction de l'entrée. */

const searchBar = document.querySelector(".input-theme");

searchBar.addEventListener("keyup", (e) => {
    if (e.target.value.length > 2) {
        const searchtxt = e.target.value.toLowerCase();
        filterCards(searchtxt);
        addIngredienttoDom(getFilteredData(searchtxt));
        addAppareiltoDom(getFilteredData(searchtxt));
        addUstensiletoDom(getFilteredData(searchtxt));
    } else {
        addCardstoDom(recipes);
    }
});

/* Écoute d'un événement keyup sur la barre de recherche. Si la longueur de la barre de recherche est
supérieure à 2, elle appellera la fonction addIngredienttoDom et transmettra le tableau des recettes
et la variable searchtxt. Il appellera également la fonction filterCards et passera la variable
searchtxt. Si la longueur de la barre de recherche est inférieure à 2, elle appellera la fonction
addCardstoDom et transmettra le tableau des recettes. Il appellera également la fonction
addIngredienttoDom et passera le tableau des recettes. */
const searchIng = document.querySelector(".blue");

searchIng.addEventListener("keyup", (e) => {
    if (e.target.value.length > 2) {
        const searchtxt = e.target.value.toLowerCase();
        addIngredienttoDom(recipes, searchtxt);
        filterCards(searchtxt);
    } else {
        addCardstoDom(recipes);
        addIngredienttoDom(recipes);
    }
});

/* Écoute d'un événement keyup sur l'élément searchApp. Si la longueur de la valeur de l'entrée est
supérieure à 2, elle appellera la fonction addAppareiltoDom et passera le tableau des recettes et la
variable searchtxt. Il appellera également la fonction filterCards et passera la variable searchtxt.
Si la longueur de la valeur de l'entrée est inférieure ou égale à 2, elle appellera la fonction
addCardstoDom et passera dans le tableau des recettes. Il appellera également la fonction
addAppareiltoDom et passera dans le tableau des recettes */
const searchApp = document.querySelector(".green");

searchApp.addEventListener("keyup", (e) => {
    if (e.target.value.length > 2) {
        const searchtxt = e.target.value.toLowerCase();
        addAppareiltoDom(recipes, searchtxt);
        filterCards(searchtxt);
    } else {
        addCardstoDom(recipes);
        addAppareiltoDom(recipes);
    }
});

/* Écoute d'un événement keyup sur la barre de recherche. Si la longueur de la barre de recherche est
supérieure à 2, elle filtrera les cartes et les ustensiles. Si la longueur est inférieure à 2, il
affichera toutes les cartes et tous les ustensiles. */
const searchUst = document.querySelector(".red");

searchUst.addEventListener("keyup", (e) => {
    if (e.target.value.length > 2) {
        const searchtxt = e.target.value.toLowerCase();
        addUstensiletoDom(recipes, searchtxt);
        filterCards(searchtxt);
    } else {
        addCardstoDom(recipes);
        addUstensiletoDom(recipes);
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
 * Il prend le contenu textuel de l'élément cliqué et l'ajoute à l'objet tags, puis l'ajoute au DOM.
 * @param e - l'objet événement
 */

function addTag(e) {
    const tagsContent = document.querySelector(".newTags");
    const tagText = e.target.textContent;
    const tagType = e.target.parentNode.classList[0];

    if (tags[list2class[tagType]].indexOf(tagText) === -1) {
        const liElement = document.createElement("li");
        liElement.setAttribute("class", list2class[tagType]);

        liElement.innerHTML = `${tagText} <i class="far fa-times-circle"></i>`;
        liElement.querySelector(".far").addEventListener("click", (e) => {
            liElement.remove();
            const index = tags[list2class[tagType]].indexOf(tagText);
            tags[list2class[tagType]].splice(index, 1);
            filterCards();
        });
        tagsContent.appendChild(liElement);
        tags[list2class[tagType]].push(tagText.toLowerCase());
        filterCards();
    }
}