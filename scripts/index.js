/* Importing the data from the file `recipes.js` into the variable `recipes`. */
import recipes from "/data/recipes.js";

// console.log(recipes);

/**
 * Create a card element, add the class `cardlist`, add the ingredients list, and return the card
 * element
 * @param data - The data object that is passed to the function.
 * @returns A div element with a class of cardlist.
 */

function buildCard(data) {
    // console.log(data);

    const cardElement = document.createElement('div');
    cardElement.setAttribute('class', 'col-md-4 col-sm-6 pb-4')

    cardElement.innerHTML = ` <div class="card">
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
            <ul class="col-6 ingerdients">
                <li>Lait de coco: 400 ml</li>
                <li>Jus de citron: 2</li>
                <li>Crème de coco: 4 cuillères</li>
                <li>Sucre: 20g</li>
                <li>Glaçons: 2</li>
            </ul>
            <p class="col-6 m-0 card-text">
            ${data.description}
            </p>
        </div>
    </div>
</div>`;


    const ingredients = cardElement.querySelector('.ingerdients');
    data.ingredients.forEach(element => {
        const ingredient = document.createElement('li');
        ingredient.innerHTML = `<strong>${element.ingredient} : </strong>${element.quantity  || ''} ${element.unit || ''}`;
        ingredients.appendChild(ingredient);
    });

    return cardElement
}


const cardlist = document.querySelector('.cardlist')

recipes.forEach(el => {
    const card = buildCard(el);
    cardlist.appendChild(card)
})

const card = buildCard(recipes[0]);
cardlist.appendChild(card)