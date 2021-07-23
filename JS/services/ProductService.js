import {Product} from "../models/Product.js";

export class ProductService {

    constructor() {}

    async getProduct(productId) {
        // console.log(productId);
        //Récupération de l'id via l'API
        return fetch(`http://localhost:3000/api/cameras/` + productId)
            .then((data) => {
                return data.json();
            })
            .then((rawData) => new Product(rawData.id, rawData.name, rawData.description, rawData.imageUrl, rawData.price, rawData.lense))
            
    }

    
    displayProduct(product) {
        const containerProduct = document.getElementById('containerproduct');
        containerProduct.insertAdjacentHTML(
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

        console.log(product.id);
        console.log(product.lense);
        console.log(product.name);
        console.log(product.price / 100);
        console.log(product.description);

        //Séléction du bouton Ajouter au panier
        const addToCartBtn = document.getElementById('btnCart'); 

        //Ecouteur d'évenement sur le bouton
        addToCartBtn.addEventListener('click', (event) => {
            event.preventDefault();//pour ne pas réactualiser la page au click 

        //Récupération des valeurs du formulaire 
        let productOptions = 
            {
                name: product.name, 
                id: product._id,
                price: product.price / 100,
            };

        let localStorageProduct = JSON.parse(localStorage.getItem('product'));

        const addProductInLocalStorage = () => {
            localStorageProduct.push(productOptions);
            localStorage.setItem("produit", JSON.stringify(localStorageProduct));
        };

        if(localStorageProduct) {
            addProductInLocalStorage();
            console.log(localStorageProduct);

        } else {
        localStorageProduct = [];
        addProductInLocalStorage();
        console.log(localStorageProduct);

        }
        });
    }
}

// .then((article) => {
//     displayArticle(article);
// })
//     .catch((error) => {
//         console.log(error);
//     });
