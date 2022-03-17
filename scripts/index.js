/* Importing the data from the file `recipes.js` into the variable `recipes`. */
import recipes from "./data/recipes.js";

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
            <ul class="col-6 ingredients">
            </ul>
            <p class="col-6 m-0 card-text">
            ${data.description}
            </p>
        </div>
    </div>
</div>`;


    const ingredients = cardElement.querySelector('.ingredients');
    data.ingredients.forEach(element => {
        const ingredient = document.createElement('li');
        ingredient.innerHTML = `${element.ingredient} : ${element.quantity  || ''} ${element.unit || ''}`;
        ingredients.appendChild(ingredient);
    });

    return cardElement

}
/* Creating a card for each recipe in the recipes array. */
const cardlist = document.querySelector('.cardlist')

recipes.forEach(el => {
    const card = buildCard(el);
    cardlist.appendChild(card)
})

const card = buildCard(recipes[0]);
cardlist.appendChild(card)




/* Adding an event listener to the search bar. When the user types in the search bar, the function
`filterElements` is called. */

const searchBar = document.querySelector('.input-theme');

searchBar.addEventListener("keyup", (e) => {
    const searchedLetters = e.target.value;
    const cards = document.querySelectorAll(".card");
    filterElements(searchedLetters, cards);
});

/**
 * Given a string of letters and a list of elements, hide all elements that don't contain the letters
 * @param letters - The letters that you want to filter by.
 * @param elements - The elements to filter.
 */
function filterElements(letters, elements) {
    if (letters.length > 2) {
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].textContent.toLowerCase().includes(letters)) {
                elements[i].style.display = "block";
            } else {
                elements[i].style.display = "none";
            }

        }
    }
}