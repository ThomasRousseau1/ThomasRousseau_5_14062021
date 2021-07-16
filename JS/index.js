// //xmlhttprequest, récupérer l'objet au chargement, créer boucle for of et recréer chaque élément à la place du html


////////////////////////////////Pour récupérer les élements au chargement\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
(async function() {
    const articles = await getArticles();

    displayArticles(articles);
})();


//////////////////////Appel de l'API et déclaration de la fonction getArticles pour récupérer les produits\\\\\\\\\\\\\\\\\\\\\\\\\
function getArticles() {
    return (
        fetch("http://localhost:3000/api/cameras/")
        .then(function(data) {
            return data.json();
        })
        .then(function(articles) {
            return articles;

        })
        .catch(function(error) {
            alert(error);
        })
    );
}

///////////////////////////Déclaration de la fonction displayArticles pour afficher les articles\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function displayArticles(articles) {
    articles.forEach(function(article) {
        const container = document.getElementById("products");
        //innerHTML
        container.insertAdjacentHTML(
            "beforeend",
            `<section id="products">
            <article id="productContainer" class="products__container">
            <img id="productImage" class="products__image" src="${article.imageUrl}" alt="Appareil photo Zeiss Ikon">
            <h3 id="productTitle" class="products__title">${article.name}</h3>
            <div class="products__infos">
                <p id="productPrice" class="products__price">${article.price / 100} €</p>
                <a class="addCart" href="produits.html?id=${article._id}">
                    <button id="productButton" class="products__button">Découvrir</button>
                </a>
            </div>
            </article>
            </section>`
        );
        //document.createElement et appendChild
        //console.log(article);
    });
}