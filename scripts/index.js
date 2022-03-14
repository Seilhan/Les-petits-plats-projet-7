import recipes from "./data/recipes.js";

console.log(recipes);

function buildCard(data) {

    const cardElement = document.createElement('div');

    div.innerHTML =
        `<div class="card" tabindex="0">
    <img class="card-img-top" alt="" />
    <div class="card-body">
        <div class="d-flex justify-content-between">
            <h4 class="card-title">Limonade de Coco</h4>
            <div class="col-4 d-flex card-content flex-row align-items-center justify-content-end">
                <i class="bi bi-clock"></i>
                <p class="card-subtitle"><strong>10 min</strong></p>
            </div>
        </div>
        <div class="ingredients d-flex justify-content-between">
            <ul class="col-6">
                <li><strong>Lait de Coco :</strong> 400 ml</li>
                <li><strong>Jus de citron :</strong> 2</li>
                <li><strong>Crème de coco :</strong> 4 cuillières</li>
                <li><strong>Sucre :</strong> 20g</li>
                <li><strong>Glaçons :</strong> 2</li>
            </ul>
            <p class="card-text col-6">
                Mettre les glaçons à votre goût dans le blender, ajouter le lait, la crème de coco, le jus de 2 citrons et le sucre. Mixer jusqu'à avoir la consistence désirée
            </p>
        </div>
    </div>`;

    return div

}