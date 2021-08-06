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
            .then((rawData) => new Product(rawData._id, rawData.name, rawData.description, rawData.imageUrl, rawData.price, rawData.lenses))
            
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
            <a class="addCart" href="panier.html"><button id="btnCart" class="products__button" href="panier.html">Ajouter au panier</button></a>
        </div> 
        </article>`
        );
        
        //Pour la sélection des objectifs
        const lenses = product.lenses;
        lenses.forEach(function (lens) {
        const objectif = document.getElementById('objectif');
        objectif.insertAdjacentHTML("beforeend", `<option>${lens}</option>`);
        });


        //On écoute le bouton ajouter au panier au click
        let addToCartBtn = document.getElementById('btnCart');
        // console.log(addToCartBtn);
            // addToCartBtn.addEventListener('click', addToCart);
            addToCartBtn.addEventListener('click', (event) => {
        
        /*************************************************LOCAL STORAGE****************************************/
        //Création d'un tableau contenant les infos d'un article
        let productOptions = 
            {
                image: product.image,
                name: product.name,
                id: product.id,
                price: product.price / 100,
            };
            
        let localStorageProduct = JSON.parse(localStorage.getItem("product"));

        //Pour ajouter un produit séléctionné dans le localStorage
        const addLocalStorage = () => {
            //Ajout dans le tableau de l'objet avec les valeurs choisies par l'utilisateur
            localStorageProduct.push(productOptions);
            //Transformation en format JSON et envoyer dans la key article du localStorage
            localStorage.setItem("product", JSON.stringify(localStorageProduct));
        };
        
        //Si il y a déjà un produit dans le localStorage
        if(localStorageProduct){
            addLocalStorage();
            console.log(localStorageProduct);
        //Si il n'y a pas de produit dans le localStorage
        } else {
            localStorageProduct = [];
            addLocalStorage();
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
