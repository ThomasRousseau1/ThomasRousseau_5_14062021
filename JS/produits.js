import {ProductService} from "./services/ProductService.js";

init();

async function init() {

    const productService = new ProductService();

    let params = new URLSearchParams(window.location.search);
    let productId = params.get("id");

    const retrieveProduct = await productService.getProduct(productId);
    productService.displayProduct(retrieveProduct);

}

//
// //Affichage dynamique des articles en les récupérant via l'API

    //
    // //Sélection de l'objectif
    // const lenses = article.lenses;
    // lenses.forEach(function (lens) {
    //     const objectif = document.getElementById('objectif');
    //     objectif.insertAdjacentHTML("beforeend", `<option>${lens}</option>`);
    //     // console.log(objectif);
    // });

//
//
// /**********************************BOUTON POUR AJOUT AU PANIER************************************/
//     //On écoute le bouton ajouter au panier au click
// let addToCartBtn = document.getElementById('btnCart');
// // console.log(addToCartBtn);
//     addToCartBtn.addEventListener('click', addToCart);
//     addToCartBtn.addEventListener('click', (event) => {
//
// /*************************************************LOCAL STORAGE****************************************/
//  //Création d'un tableau contenant les infos d'un article
//  let articleOption = [
//     {
//         name: article.name,
//         id: article._id,
//         price: article.price / 100,
//     }
//  ];
//
// let localStorageArticle = JSON.parse(localStorage.getItem("article"));
// // console.log(localStorageArticle);
//
// //Fenêtre pop up de confirmation
// // const popupConfirmation = () => {
// //     if(window.confirm(`L'article ${article.name} a bien été ajouté au panier.`)) {
// //         window.location.href="panier.html";
// //     } else {
// //         window.location.href="index.html";
// //     }
// // }
//
// //Pour ajouter un produit séléctionné dans le localStorage
// const addLocalStorage = () => {
//     //Ajout dans le tableau de l'objet avec les valeurs choisies par l'utilisateur
//     localStorageArticle.push(articleOption);
//     //Transformation en format JSON et envoyer dans la key article du localStorage
//     localStorage.setItem("article", JSON.stringify(localStorageArticle));
// };
//
// //Si il y a déjà un produit dans le localStorage
// if(localStorageArticle){
//     addLocalStorage();
//     console.log(localStorageArticle);
//     // popupConfirmation();
// //Si il n'y a pas de produit dans le localStorage
// } else {
//     localStorageArticle = [];
//     addLocalStorage();
//     console.log(localStorageArticle);
//     // popupConfirmation();
// }
// });
//
// /***********************************************PANIER*************************************************/
//
//     let mainContainer = document.getElementsByTagName('tbody')[0];
//     let quantityFields = document.getElementsByClassName('num')
//     let removeBtns = document.getElementsByClassName('table__button')
//
//
//     //On récupère tous les éléments à mettre dans le panier soit l'image, le nom et le prix
//     function addToCart(event){
//         let btn = event.target
//         let btnParent = btn.parentElement.parentElement.parentElement
//         // console.log(btnParent);
//         let itemImage = btnParent.children[0].src
//         let itemName = btnParent.children[1].innerText
//         let itemPrice = btnParent.children[3].innerText
//         //Création d'un tableau pour les articles allant dans le panier après sélection
//         let itemContainer = document.createElement('tr')
//         itemContainer.innerHTML = `
//         <td><input class="table__checkbox" type="checkbox"></td>
//         <td><img class="table__img" src="${article.imageUrl}"></td>
//         <td><p class="table__name">${article.name}</p></td>
//         <td><p class="table__price">${article.price / 100} €</p></td>
//         <td><input type="number" class="num" value="1"></td>
//         <td class="table__total--price"><p>${article.price / 100} €</p></td>
//         <td><button type="button" class="table__button">Supprimer</button></td>
//         `
//         console.log(itemContainer);
//
//         //Pour mettre les infos de l'article dans le container
//         mainContainer.append(itemContainer)
//
//         for(let i = 0; i < quantityFields.length; i++){
//             quantityFields[i].addEventListener('click', updateTotal)
//         }
//
//         for(let i = 0; i < removeBtns.length; i++){
//             removeBtns[i].addEventListener('click', removeItem)
//         }
//
//         cartTotal()
//
//     }
//     function updateTotal(event){
//         numberOfItems = event.target
//         numberOfItemsParent = numberOfItems.parentElement.parentElement //Pour prendre le tr
//         priceField = numberOfItemsParent.getElementsByClassName('table__price')[0]
//         totalField = numberOfItemsParent.getElementsByClassName('table__total--price')[0]
//         priceFieldContent = parseFloat(priceField.innerText.replace('$', ''))//Pour convertir la string en number
//         // console.log(typeof priceFieldContent);
//         totalField.children[0].innerText = numberOfItems.value * priceFieldContent + ' €'
//
//         //Pour empêcher l'utilisateur d'entrer des quantités inférieures ou égales à 0
//         if(isNaN(numberOfItems.value) || numberOfItems.value <= 0){
//             numberOfItems.value = 1
//         }
//         cartTotal();
//     }
//
//     //Pour le prix total de tous les articles ajoutés
//     function cartTotal(){
//         let total = 0
//         let finalPrice = document.getElementsByClassName('final__price')[0]
//         let totalPrice = document.getElementsByClassName('table__total--price')
//         for(let i = 0; i < totalPrice.length; i++){
//             totalPriceContent = parseFloat(totalPrice[i].innerText.replace('$', ''))
//             total += totalPriceContent
//         }
//         finalPrice.innerText = total + ' €'
//         finalPrice.style.fontWeight = ' bold'
//         console.log(total);
//     }
//
//     //Pour supprimer un article via le bouton supprimer
//     function removeItem(event){
//         removeBtn = event.target
//         removeBtnGrandParent = removeBtn.parentElement.parentElement
//         removeBtnGrandParent.remove()
//         cartTotal()
//     }
//
// }
