import {getProducts} from "./services/ProductService.js";

////////////////////////////////Pour récupérer les élements au chargement\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
(async function() {
    const products = await getProducts();

    displayProducts(products);
})();


///////////////////////////Déclaration de la fonction displayproducts pour afficher les products\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function displayProducts(products) {
    products.forEach(function(product) {
        const container = document.getElementById("products");
        container.insertAdjacentHTML(
            "beforeend",
            `<section id="products">
            <article id="productContainer" class="products__container">
            <img id="productImage" class="products__image" src="${product.imageUrl}" alt="Appareil photo vintage">
            <h3 id="productTitle" class="products__title">${product.name}</h3>
            <div class="products__infos">
                <p id="productPrice" class="products__price">${product.price} €</p>
                <a class="addCart" href="produits.html?id=${product._id}">
                    <button id="productButton" class="products__button">Découvrir</button>
                </a>
            </div>
            </article>
            </section>`
        );
    });
}