import {Product} from "../models/Product.js";

export class ProductService {

    constructor() {}

    async getProduct(articleId) {

        //Récupération de l'id via l'API
        return fetch(`http://localhost:3000/api/cameras/` + articleId)
            .then((data) => {
                return data.json();
            })
            .then((rawData) => new Product(rawData.id, rawData.name, rawData.description, rawData.imageUrl, rawData.price, rawData.lense))
    }

    displayProduct(product) {
        const containerArticle = document.getElementById('containerarticle');
        containerArticle.insertAdjacentHTML(
            "beforeend",
            `
            <article class="article">
            <img class="article__image" src="${product.image}">
            <h2 class="article__title">${product.name}</h2>
            <p class="article__description">${product.description}</p>
            <div class="article__quantity"> 
            <label for="lens-select">Objectif :</label>
            <select name="objectif" id="objectif">
            </select> 
                <p class="article__price">${product.price / 100} €</p>
            </div>
            <div class="button__container">
            <a href="index.html"><button class="products__button">Voir d'autres modèles</button></a>
            <a class="addCart""><button id="btnCart" class="products__button" href="panier.html">Ajouter au panier</button></a>
        </div> 
        </article>`
        );
    }

}

// .then((article) => {
//     displayArticle(article);
// })
//     .catch((error) => {
//         console.log(error);
//     });
