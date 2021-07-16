let params = new URLSearchParams(window.location.search); 
let articleId = params.get("id");

//Appel de l'id via l'API
fetch(`http://localhost:3000/api/cameras/` + articleId)
    .then((data) => {
        return data.json();
    })
    .then((article) => {
        displayArticle(article);
    })
    .catch((error) => {
        console.log(error);
    });

//Affichage dynamique des articles
function displayArticle(article) {
    const containerArticle = document.getElementById('containerarticle');
    containerArticle.insertAdjacentHTML(
        "beforeend", 
        `
            <article class="article">
            <img class="article__image" src="${article.imageUrl}">
            <h2 class="article__title">${article.name}</h2>
            <p class="article__description">${article.description}</p>
            <div class="article__quantity"> 
            <label for="lens-select">Objectif :</label>
            <select name="objectif" id="objectif">
            </select> 
                <label for="quantity-select">Quantité :</label>
                <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                <p class="article__price">${article.price / 100} €</p>
            </div>
            <div class="button__container">
            <a href="index.html"><button class="products__button">Voir d'autres modèles</button></a>
            <a class="addCart"><button id="btnCart" class="products__button">Ajouter au panier</button></a>
        </div> 
        </article>`
    );

//Création d'un tableau contenant les infos d'un article
    let articleOption = {
        name: article.name, 
        id: article._id,
        price: article.price / 100,
    };
    
    //Sélection de l'objectif
    const lenses = article.lenses;
    lenses.forEach(function (lens) {
        const objectif = document.getElementById('objectif');
        objectif.insertAdjacentHTML("beforeend", `<option>${lens}</option>`);
        // console.log(objectif);
    });



/*************************************************LOCAL STORAGE****************************************/
let localStorageArticle = JSON.parse(localStorage.getItem("article"));
console.log(localStorageArticle);

if(localStorageArticle){

} else {
    localStorageArticle = [];
    localStorageArticle.push(articleOption);
    console.log(localStorageArticle);
}


/***********************************************PANIER*************************************************/
    //On écoute le bouton au click 
    let addToCartBtn = document.getElementById('btnCart'); 
    // console.log(addToCartBtn);
    addToCartBtn.addEventListener('click', addToCart);

    let mainContainer = document.getElementsByTagName('tbody')[0];
    let quantityFields = document.getElementsByClassName('num')
    let removeBtns = document.getElementsByClassName('table__button')



    //On récupère tous les éléments à mettre dans le panier soit l'image, le nom et le prix
    function addToCart(event){
        let btn = event.target
        let btnParent = btn.parentElement.parentElement.parentElement
        let itemImage = btnParent.children[0].src
        let itemName = btnParent.children[1].innerText
        let itemPrice = btnParent.children[3].children[4].innerText
        // console.log(itemPrice);

        //Création d'un tableau pour les articles allant dans le panier après sélection 
        let itemContainer = document.createElement('tr')
        itemContainer.innerHTML = `
        <td><input class="table__checkbox" type="checkbox"></td>
        <td><img class="table__img" src="${itemImage}"></td>
        <td><p class="table__name">${itemName}</p></td>
        <td><p class="table__price">${itemPrice}</p></td>
        <td><input type="number" class="num" value="1"></td>
        <td class="table__total--price"><p>${itemPrice}</p></td>
        <td><button type="button" class="table__button">Supprimer</button></td>
        `
        
        mainContainer.append(itemContainer)

        for(let i = 0; i < quantityFields.length; i++){
            quantityFields[i].addEventListener('click', updateTotal)
        }

        for(let i = 0; i < removeBtns.length; i++){
            removeBtns[i].addEventListener('click', removeItem)
        }

        cartTotal()
    
    }  
    function updateTotal(event){
        numberOfItems = event.target
        numberOfItemsParent = numberOfItems.parentElement.parentElement //Pour prendre le tr
        priceField = numberOfItemsParent.getElementsByClassName('table__price')[0]
        totalField = numberOfItemsParent.getElementsByClassName('table__total--price')[0]
        priceFieldContent = parseFloat(priceField.innerText.replace('$', ''))//Pour convertir la string en number 
        // console.log(typeof priceFieldContent);
        totalField.children[0].innerText = numberOfItems.value * priceFieldContent + ' €'
        
        //Pour empêcher l'utilisateur d'entrer des quantités inférieures ou égales à 0
        if(isNaN(numberOfItems.value) || numberOfItems.value <= 0){
            numberOfItems.value = 1
        }
        cartTotal();
    }

    function cartTotal(){
        let total = 0
        let finalPrice = document.getElementsByClassName('final__price')[0]
        let totalPrice = document.getElementsByClassName('table__total--price')
        for(let i = 0; i < totalPrice.length; i++){
            totalPriceContent = parseFloat(totalPrice[i].innerText.replace('$', ''))
            total += totalPriceContent
        }
        finalPrice.innerText = total + ' €' 
        finalPrice.style.fontWeight = ' bold'
        console.log(total);
    }

    function removeItem(event){
        removeBtn = event.target
        removeBtnGrandParent = removeBtn.parentElement.parentElement
        removeBtnGrandParent.remove()
        cartTotal()
    }

}
















// /**************************************PANIER****************************/
// //Récupérer le form des objectifs
// const idForm = document.getElementsByTagName('select')[0];
// // console.log(idForm);

// //Mettre le choix de l'utilisateur dans une variable
// const choixForm = idForm;
// console.log(choixForm);

// //Sélection du bouton Ajouter au panier
// const boutonPanier = document.getElementById('btnCart');
// console.log(boutonPanier);


// //Ecouter le bouton 
// boutonPanier.addEventListener('click', (event) => {
//     event.preventDefault();

//     //Récupération des valeurs du formulaire 
// let optionProduit = {
//     _id: article._id,
//     name: article.name,
//     price: article.price,
//     description: article.description,
//     imageUrl: article.imageUrl

// }

// console.log(optionProduit);

// });









/*************************************LOCAL STORAGE************************************/

// let articleLocalStorage = JSON.parse(localStorage.getItem('article'));
// //JSON.parse pour convertire les données au format JSON qui son en format objet
// console.log(articleLocalStorage);

// //s'il y a déjà des produits
// if(articleLocalStorage){ 

//     //s'il n'y a pas de produits
// } else {
//     articleLocalStorage = [];
//     articleLocalStorage.push()
//     console.log(articleLocalStorage);
// }





















/***********************************************Ajout au panier********************************************/

//penser au localStorage.getItem & locastorage.setItem

//Pour passer d'un objet à une chaine de caractère : JSON.stringify et l'inverse : JSON.parse 



// let carts = document.querySelectorAll('.addCart');

// //Tableau des articles 
// let products = [
//     {
//         name: 'product.name', 
//         tag: 'product.id', 
//         price: '',
//         inCart: 0
//     },
//     {
//         name: 'p2', 
//         tag: '', 
//         price: '',
//         inCart: 0
//     },
//     {
//         name: 'p3', 
//         tag: '', 
//         price: '',
//         inCart: 0
//     },
//     {
//         name: 'p4', 
//         tag: '', 
//         price: '',
//         inCart: 0
//     },
//     {
//         name: 'p5', 
//         tag: '', 
//         price: '',
//         inCart: 0
//     }             
// ]

// // Ecouteur d'évenement bouton panier 
// // btnCart.addEventListener('click', function () {
// //     // console.log('added to cart');
// //     cartNumbers(products);
// // })

// for (let i=0; i < carts.length; i++) {
//     carts[i].addEventListener('click', () => {
//         cartNumbers(products[i]);
//     })
// }

// function onLoadCartNumbers() {
//     let productNumbers = localStorage.getItem('cartNumbers');

//     if(productNumbers) {
//         document.querySelector('.header__span').textContent = productNumbers;
//     }
// }


// function cartNumbers(product) {
//     console.log("The product clicked is", product)
//     let productNumbers = localStorage.getItem('cartNumbers');

//     productNumbers = parseInt(productNumbers);//pour convertir la string en number

//     if(productNumbers) {
//         localStorage.setItem('cartNumbers', productNumbers + 1);//pour ajouter un article
//         document.querySelector('.header__span').textContent = productNumbers + 1;
//     } else {
//         localStorage.setItem('cartNumbers', 1);
//         document.querySelector('.header__span').textContent = 1;
//     }
//     setItems(product);
// }

// function setItems(product) {
//     let cartItems = localStorage.getItem('productsInCart');
//     console.log("My CartItems are", cartItems);
//     cartItems = JSON.parse(cartItems);

//     product.inCart = 1;

//     cartItems = {
//         [product.tag]: product
//     }

//     localStorage.setItem('productsInCart', JSON.stringify(cartItems));
// }

// onLoadCartNumbers();





