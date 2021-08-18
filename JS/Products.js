import {ProductService} from "./services/ProductService.js";



init();

async function init() {

    const productService = new ProductService();

    let params = new URLSearchParams(window.location.search);
    let productId = params.get("id");

    const retrieveProduct = await productService.getProduct(productId);
    displayProduct(retrieveProduct);
}

	function displayProduct(product) {
		//Récupération du conteneur dans le html puis injection dynamique du html dans ce dernier
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
                <p class="article__price">${product.price} €</p>
            </div>
            <div class="button__container">
            <a href="index.html"><button class="products__button">Voir d'autres modèles</button></a>
            <a class="addCart" href="panier.html"><button id="btnCart" class="products__button" href="panier.html">Ajouter au panier</button></a>
        </div> 
        </article>`
        );

		//Selection des objectifs
		const lenses = product.lenses;
		lenses.forEach(function(lens) {
			const objectif = document.getElementById('objectif');
			objectif.insertAdjacentHTML("beforeend", `<option>${lens}</option>`);
		});


		//Ecoute du bouton btnCart pour l'ajout au panier et localStorage
		let addToCartBtn = document.getElementById('btnCart');
		addToCartBtn.addEventListener('click', (event) => {

			/////////////////////////////////////LOCAL STORAGE\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
			//Création d'un tableau contenant les infos d'un article
			let productOptions = {
				image: product.image,
				name: product.name,
				id: product.id,
				price: product.price,
			};

			let localStorageProduct = JSON.parse(localStorage.getItem("product"));


			//Pour ajouter un produit séléctionné dans le localStorage
			const addLocalStorage = () => {
				//Ajout dans le tableau de l'objet avec les valeurs choisies par l'utilisateur
				localStorageProduct.push(productOptions);
				//Transformation en format JSON envoi dans la key product du localStorage
				localStorage.setItem("product", JSON.stringify(localStorageProduct));
			};

			//Si il y a déjà un produit dans le localStorage
			if (localStorageProduct) {
				addLocalStorage();
				//Si il n'y a pas de produit dans le localStorage
			} else {
				localStorageProduct = [];
				addLocalStorage();
			}
		});
	}
    
