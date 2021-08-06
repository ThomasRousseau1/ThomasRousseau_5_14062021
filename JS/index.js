// //xmlhttprequest, récupérer l'objet au chargement, créer boucle for of et recréer chaque élément à la place du html


////////////////////////////////Pour récupérer les élements au chargement\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
(async function() {
    const products = await getProducts();

    displayProducts(products);
})();


//////////////////////Appel de l'API et déclaration de la fonction getProducts pour récupérer les produits\\\\\\\\\\\\\\\\\\\\\\\\\
function getProducts() {
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

///////////////////////////Déclaration de la fonction displayproducts pour afficher les products\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function displayProducts(products) {
    products.forEach(function(product) {
        const container = document.getElementById("products");
        //innerHTML
        container.insertAdjacentHTML(
            "beforeend",
            `<section id="products">
            <article id="productContainer" class="products__container">
            <img id="productImage" class="products__image" src="${product.imageUrl}" alt="Appareil photo vintage">
            <h3 id="productTitle" class="products__title">${product.name}</h3>
            <div class="products__infos">
                <p id="productPrice" class="products__price">${product.price / 100} €</p>
                <a class="addCart" href="produits.html?id=${product._id}">
                    <button id="productButton" class="products__button">Découvrir</button>
                </a>
            </div>
            </article>
            </section>`
        );
        //document.createElement et appendChild
        // console.log(product);
    });
}