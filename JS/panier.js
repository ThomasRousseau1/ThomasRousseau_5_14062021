//Récupération des articles présents dans le localStorage
let localStorageArticle = JSON.parse(localStorage.getItem("itemContainer"));


if (!localStorageArticle) {
    console.log("Le panier est vide");
} else {
    console.log('Vos produits ont bien été ajoutés au panier')
}

/********************************FORMULAIRE******************************/

//Pour que l'utilisateur entre une adresse mail valide
