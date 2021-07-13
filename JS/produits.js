let params = new URLSearchParams(window.location.search); 
let articleId = params.get("id");

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


function displayArticle(article) {
    const containerArticle = document.getElementById('containerarticle');
    containerArticle.insertAdjacentHTML(
        "beforeend", 
        `<main id="containerarticle"class="main__product" data-id="${articleId}">
            <img class="article__image" src="${article.imageURL}">
            <h2 class="article__title">${article.name}</h2>
            <p class="article__description">${article.description}</p>
            <div class="article__quantity"> 
            <label for="lens-select">Objectif :</label>
            <select name="lens">
                <option value="50mm 1.8">50mm 1.8</option>
                <option value="90mm 2.8">90mm 2.8</option>
            </select> 
                <!-- <label for="quantity-select">Quantité :</label>
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
                <p class="article__price">${article.price}</p>
            </div>`
    );
}


/***********************************************Ajout au panier********************************************/

//penser au localStorage.getItem & locastorage.setItem

//Pour passer d'un objet à une chaine de caractère : JSON.stringify et l'inverse : JSON.parse 



let carts = document.getElementById('btnCart');

//Tableau des articles 
let products = [
    {
        name: '', 
        tag: '', 
        price: '',
        inCart: 0
    },
    {
        name: '', 
        tag: '', 
        price: '',
        inCart: 0
    },
    {
        name: '', 
        tag: '', 
        price: '',
        inCart: 0
    },
    {
        name: '', 
        tag: '', 
        price: '',
        inCart: 0
    },
    {
        name: '', 
        tag: '', 
        price: '',
        inCart: 0
    }             
]

// Ecouteur d'évenement bouton panier 
btnCart.addEventListener('click', function () {
    console.log('added to cart');
    cartNumbers();
})

function cartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);//pour convertir la string en number

    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);//pour ajouter un article
    } else {
        localStorage.setItem('cartNumbers', 1)
    }
}





