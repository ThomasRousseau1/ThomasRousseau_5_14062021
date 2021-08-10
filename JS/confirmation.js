
//Récupérer l'orderId de la commande
let orderId = window.location.search; 
orderId = orderId.substring(9);
const urlParams = new URLSearchParams(orderId);

//Récupérer le prix total de la commande passée 
const finalPrice = JSON.parse(localStorage.getItem("finalPrice"));

//Message de remerciement avec n° de commande et prix total 
const orderContainer = document.querySelector(".summary"); 

orderContainer.insertAdjacentHTML ("beforeend",
    `<h3 class="summary__title">Récapitulatif de votre commande :</h3>
    <p class="summary__description">Commande n°<strong>${orderId}</strong></p>
    <p class="summary__price">Prix total : <strong>${finalPrice} €</strong></p>`
)

//Effacer le localStorage
localStorage.clear();