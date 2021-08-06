import {Product} from "./models/Product.js";

import { CartService } from "./services/CartService.js";
const cartService = new CartService();
init();
deleteItem();
updateTotal();
displayForm();


function init() {

    const cart = cartService.getCart();
    cartService.displayCart(cart);
}

export function deleteItem(id) {
    cartService.deleteItem(id);
}

function updateTotal() {
    cartService.updateTotal();
}

function displayForm() {
    cartService.displayForm();
}


// //Récupération des articles présents dans le localStorage
// let localStorageProduct = JSON.parse(localStorage.getItem("product"));
// // console.log(product);
// // console.log(localStorageProduct);


// //Sélection du conteneur où ajouter le html 
// const mainContainer = document.getElementsByTagName("tbody")[0];
// console.log(mainContainer);

// //Si le panier est vide
// if (localStorageProduct === null) {
// const emptyCart = `
{/* <div class="container-empty-cart">
    <div>Le panier est vide</div>
</div> */}
// `;//Penser à styliser la div
// mainContainer.innerHTML = emptyCart;

// } else {
// //Si le panier n'est pas vide : afficher les produits du localstorage
// let cartStructure = []; 
// let productContainer = document.createElement("tr");

// for (k = 0; k < localStorageProduct.length; k++) {
//     console.log("J'ai " + localStorageProduct.length + " article(s) dans le panier");
//     cartStructure = cartStructure + productContainer +`
//             <td><input class="table__checkbox" type="checkbox"></td>
//         <td><img class="table__img" src="${localStorageProduct[k].product.image}"></td>
//         <td><p class="table__name">${localStorageProduct[k].product.name}</p></td>
//         <td><p class="table__price">${localStorageProduct[k].product.price / 100} €</p></td>
//         <td><input type="number" class="num" value="1"></td>
//         <td class="table__total--price"><p>${localStorageProduct[k].product.price / 100} €</p></td>
//         <td><button type="button" class="table__button">Supprimer</button></td>
//     `;
// }
//     if (k == localStorageProduct.length) {
//         localStorageProduct.innerHTML = cartStructure;
//     }

// }


// /********************************FORMULAIRE******************************/

// //Pour que l'utilisateur entre une adresse mail valide
