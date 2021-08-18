import {Product} from "../models/Product.js";

//////////////////////Appel de l'API et déclaration de la fonction getProducts pour récupérer les produits\\\\\\\\\\\\\\\\\\\\\\\\\
export function getProducts() {
    return (
        fetch("http://localhost:3000/api/cameras/")
        .then(function(data) {
            return data.json();
        })
        .then(function(products) {
            return products;

        })
        .catch(function(error) {
            alert(error);
        })
    );
}
getProducts();

//////////////////////Déclaration de la fonction getProduct avec l'id product en paramètre pour affichage sur la page produit\\\\\\\\\\\\\\\\\\\\\\\\\
export class ProductService {

	constructor() {}

	async getProduct(productId) {
		//Récupération de l'id via l'API
		return fetch(`http://localhost:3000/api/cameras/` + productId)
			.then((data) => {
				return data.json();
			})
			.then((rawData) => new Product(rawData._id, rawData.name, rawData.description, rawData.imageUrl, rawData.price, rawData.lenses))
	}
}