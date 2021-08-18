import {Cart} from "../models/Cart.js";

const LOCAL_STORAGE_KEY = "product";
let localStorageProduct = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

export class CartService {
    constructor() {}

    getCart() {
        //Récupération des produits du localStorage
        const products = localStorageProduct;
        return new Cart(products);
    }

    displayCart(cart) {
        //Affichage des produits du localStorage dans le panier
        const tableContainer = document.getElementById('table__container');

        for (const product of cart.products) {
            let productsInCartContainer = document.createElement('tr');
            productsInCartContainer.setAttribute("id", "productRow_" + product.id)

            productsInCartContainer.innerHTML = `
                <td></td>
                <img class="article__image" src="${product.image}">
                <td><p class="table__name">${product.name}</p></td>
                <td><p class="table__price">${product.price} €</p></td>
                <td><button type="button" class="table__button" id="deletebutton_${product.id}">Supprimer</button></td>
                `;

            tableContainer.appendChild(productsInCartContainer);
        };
    }

    deleteItem() {
        //Suppression d'un produit dans le panier et localStorage en écoutant le bouton supprimer
        let deleteBtn = document.querySelectorAll("[id^='deletebutton_']");
        deleteBtn.forEach((buttonObject) => {
            buttonObject.addEventListener("click", (event) => {
                event.preventDefault();

                let objectId = buttonObject.id.split("_")[1];

                //Pour récupérer la ligne du produit que l'on souhaite supprimer
                let itemRow = document.getElementById("productRow_" + objectId);

                localStorageProduct = localStorageProduct.filter(el => el.id !== objectId);
                itemRow.remove();

                localStorage.setItem("product", JSON.stringify(localStorageProduct));

                //Rechargement automatique de la page après suppression d'un produit pour mettre à jour le total
                window.location.href = "panier.html";
            });

        });

    }


    updateTotal() {
        let totalPrice = [];

        for (let m = 0; m < localStorageProduct.length; m++) {
            let productPriceInCart = localStorageProduct[m].price;

            totalPrice.push(productPriceInCart)
        }

        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const finalPrice = totalPrice.reduce(reducer, 0);
        const tableContainer = document.getElementById('table__container');

        let displayTotalPrice = document.createElement("tr");
        displayTotalPrice.innerHTML =
            `            
        <td></td>
        <td><h3><strong>Total :</strong></h3></td>
        <td></td>
        <td class="final__price"><h3><strong>${finalPrice}€</strong></h3></td>
        `;

        tableContainer.appendChild(displayTotalPrice);
        const mainContainer = document.getElementsByTagName("table")[0];

        //Pour signaler que le panier est vide
        if (finalPrice == 0) {
            const emptyCart = `
            <div class="container-empty-cart">
                <div>Le panier est vide ! <i class="fas fa-camera-retro"></i></div>
            </div>
            `;
            mainContainer.innerHTML = emptyCart;
        }
        const localStorageFinalPrice = localStorage.setItem("finalPrice", finalPrice);

    }


    displayForm() {
        const sendFormBtn = document.querySelector(".order__button");
        sendFormBtn.addEventListener("click", (e) => {
            e.preventDefault();

            //Récupération des valeurs du form pour les stocker dans le localStorage
            const formValues = {
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                address: document.getElementById("address").value,
                city: document.getElementById("city").value,
                email: document.getElementById("email").value
            }

            ///////////////////////////////Début Validation du formulaire\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

            const textAlert = (value) => {
                return `${value}: Pas de chiffres et symboles. Nom compris entre 3 et 20 caractères.`
            }
            //RegExp pour prénom, nom et ville
            const regExpNamesCity = (value) => {
                return /^([A-Za-z]{3,20}\-{0,1})?([A-Za-z]{3,20})$/.test(value);
            };

            const regExpAddress = (value) => {
                return /^[0-9]{1,4}[A-Za-z\s-]{3,30}$/.test(value);
            };

            const regExpEmail = (value) => {
                return /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/.test(value);
            }


            function firstNameCheck() {
                //Validation du prénom et ajout d'icônes pour montrer que le champ est valide ou ne l'est pas en fonction des regExp
                const firstNameValidation = formValues.firstName;
                if (regExpNamesCity(firstNameValidation)) {
                    document.getElementById("missing-firstname").innerHTML = '<i class="fas fa-check-circle" id="form-success"></i>';
                    return true;
                } else {
                    document.getElementById("missing-firstname").innerHTML = '<i class="fas fa-times-circle" id="form-warning"></i>';
                    alert(textAlert("Prénom"));
                    return false;
                };
            }


            function lastNameCheck() {
                const lastNameValidation = formValues.lastName;
                if (regExpNamesCity(lastNameValidation)) {
                    document.getElementById("missing-lastname").innerHTML = '<i class="fas fa-check-circle" id="form-success"></i>';
                    return true;
                } else {
                    document.getElementById("missing-lastname").innerHTML = '<i class="fas fa-times-circle" id="form-warning"></i>';
                    alert(textAlert("Nom"));
                    return false;
                };
            }

            function addressCheck() {
                const addressValidation = formValues.address;
                if (regExpAddress(addressValidation)) {
                    document.getElementById("missing-address").innerHTML = '<i class="fas fa-check-circle" id="form-success"></i>';
                    return true;
                } else {
                    document.getElementById("missing-address").innerHTML = '<i class="fas fa-times-circle" id="form-warning"></i>';
                    alert("L'adresse doit comporter un à quatre chiffres puis des lettres.");
                    return false;
                };
            }

            function cityCheck() {
                const cityValidation = formValues.city;
                if (regExpNamesCity(cityValidation)) {
                    document.getElementById("missing-city").innerHTML = '<i class="fas fa-check-circle" id="form-success"></i>';
                    return true;
                } else {
                    document.getElementById("missing-city").innerHTML = '<i class="fas fa-times-circle" id="form-warning"></i>';
                    alert("L'adresse doit comporter un chiffre puis des lettres.");
                    return false;
                };
            }

            function emailCheck() {
                const emailValidation = formValues.email;
                if (regExpEmail(emailValidation)) {
                    document.getElementById("missing-email").innerHTML = '<i class="fas fa-check-circle" id="form-success"></i>';
                    return true;
                } else {
                    document.getElementById("missing-email").innerHTML = '<i class="fas fa-times-circle" id="form-warning"></i>';
                    alert("L'adresse mail n'est pas conforme. Suivez l'exemple : toto123@gmail.com");
                    return false;
                };
            }

            //Contrôle de la validité du form avant envoi dans le localStorage pour chaque input
            if (firstNameCheck() && lastNameCheck() && addressCheck() && cityCheck() && emailCheck()) {
                //Mettre l'objet formValues dans le localStorage
                localStorage.setItem("formValues", JSON.stringify(formValues));
            } else {
                alert("Veuillez remplir correctement le formulaire");
                return false;
            }
            //////////////////////////////Fin Validation formulaire\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

            /////////////////////////////Envoi des données au serveur\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
            function sendData() {
                const toSend = {
                    products: localStorageProduct.map((product) => product.id),
                    contact: formValues
                }

                //Envoi des données toSend au serveur grâce à la méthode POST
                const promise = fetch("http://localhost:3000/api/cameras/order", {
                        method: "POST",
                        body: JSON.stringify(toSend),
                        headers: {
                            "Content-Type": "application/json"
                        },
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        const localStorageFinalPrice = JSON.parse(localStorage.getItem("finalPrice"));
                        window.location.href = "confirmation.html?orderId=" + data.orderId;

                        //Condition pour empecher le déclenchement de la commande si le panier est vide
                        if (localStorageProduct == 0) {
                            window.location.href = "panier.html";
                        }
                    })
                    .catch(function(error) {
                        alert(error);
                    })

            }

            sendData()
        });


        //Mettre le contenu du localStorage dans les champs du form pour le garder en mémoire
        const dataLocalStorage = localStorage.getItem("formValues");
        const dataLocalStorageObject = JSON.parse(dataLocalStorage);

        if (dataLocalStorageObject == null) {
            console.log("Formulaire vide dans le localStorage");
        } else {
            document.getElementById("firstName").value = dataLocalStorageObject.firstName;
            document.getElementById("lastName").value = dataLocalStorageObject.lastName;
            document.getElementById("address").value = dataLocalStorageObject.address;
            document.getElementById("city").value = dataLocalStorageObject.city;
            document.getElementById("email").value = dataLocalStorageObject.email;
        }
    };
}