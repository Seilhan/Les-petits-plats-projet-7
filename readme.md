# OpenClassrooms - Développeur Front-end

![Les petis plats logo](/assets/logo.png)

## <a id="start">Projet 7 - Les petits plats</a>

Les Petits Plats est un site proposant des recettes de cuisine.
Le moteur de recherche du site permet de filtrer les recettes en saisissant un ou plusieurs mots dans la barre de recherche, et/ou en sélectionnant des ingrédients, appareils et ustensiles.

---

## Liens

Lien vers la [GitHub Page](https://https://seilhan.github.io/SeilhanAndre_7_01032022/).

Lien vers la [maquette Figma](https://www.figma.com/file/xqeE1ZKlHUWi2Efo8r73NK/UI-Design-Les-Petits-Plats-FR?node-id=0%3A1).

---

## Fonctionnalités demandées

Développer un site sur base d'un fichier JavaScript contenant un tableau de 50 recettes.
Implémenter un moteur de recherche pour filtrer les recettes.
Faire deux versions du projet et comparer leurs performances (une fonctionelle et l'autre performante).

```js
const recipes = [
    {
        "id": 1,
        "name" : "Limonade de Coco",
        "servings" : 1,
        "ingredients": [
            {
                "ingredient" : "Lait de coco",
                "quantity" : 400,
                "unit" : "ml"
            },
            {
                "ingredient" : "Jus de citron",
                "quantity" : 2
            },
            {
                "ingredient" : "Crème de coco",
                "quantity" : 2,
                "unit" : "cuillères à soupe"
            },
            {
                "ingredient" : "Sucre",
                "quantity" : 30,
                "unit" : "grammes"
            },
            {
                "ingredient": "Glaçons"
            }
        ],
        "time": 10,
        "description": "Mettre les glaçons à votre goût dans le blender, ajouter le lait, la crème de coco, le jus de 2 citrons et le sucre. Mixer jusqu'à avoir la consistence désirée",
        "appliance": "Blender",
        "ustensils": ["cuillère à Soupe", "verres", "presse citron" ]
    },
    {
        ...
    }
]
```

### Objectifs du projet

- Apprendre les fondamentaux de l'algorithmie.
- Manipuler des objets possédant plusieurs niveaux.
- Comparer deux approches (fonctionnelle et performante).
- Apprendre et utiliser les méthodes filter, map, foreach et reduce.
- Travailler sur deux branches Git.
- Optionnel : apprendre à utiliser Bootstrap

---

[:top: Retour en haut de page](#start)
