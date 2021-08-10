/****************************************Récupération des articles************************************/
import {Cart} from "../models/Cart.js";

const LOCAL_STORAGE_KEY = "product";
let localStorageProduct = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

export class CartService {
    constructor() {}

    getCart() {
        const products = localStorageProduct;
        return new Cart(products);
    }


    displayCart(cart) {
        const tableContainer = document.getElementById('table__container');

        for (const product of cart.products) {
            let productsInCartContainer = document.createElement('tr');
            productsInCartContainer.setAttribute("id", "productRow_"+ product.id)

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

    deleteItem(id) {
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

                //Rechargement automatique de la page après suppression d'un produit
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
        const mainContainer = document.getElementsByTagName("tbody")[0];

        //Pour signaler que le panier est vide
        if (finalPrice === 0 || localStorageProduct === null) {
            const emptyCart = `
            <div class="container-empty-cart">
                <div>Le panier est vide ! <i class="fas fa-camera-retro"></i></div>
            </div>
            `;
            mainContainer.innerHTML = emptyCart;
        }
        console.log(finalPrice);
        const localStorageFinalPrice = localStorage.setItem("finalPrice", finalPrice);

    }


    displayForm() {
        const formContainer = document.querySelector("#form-container");

        formContainer.innerHTML = `
        <form action="" method="POST" class="form">
            <h3>Vos coordonnées</h3>
            <div class="form__container">
                <label for="firstName" class ="form__label">Prénom :</label>
                <button class="form__button"><i class="fas fa-user"></i></button>
                <input id="firstName" class="form__input" type="text" placeholder="Votre prénom">
                <span class="missing-firstname"></span>
            </div>
            <div class="form__container">
                <label for="lastName" class="form__label">Nom :</label>
                <button class="form__button"><i class="fas fa-user"></i></button>
                <input id="lastName" class="form__input" type="text" placeholder="Votre nom">
                <span class="missing-lastname"></span>
            </div>
            <div class="form__container">
            <label for="address" class="form__label">Adresse :</label>
            <button class="form__button"><i class="fas fa-home"></i></button>
            <input id="address" class="form__input" type="text" placeholder="Votre adresse postale">
            <span class="missing-address"></span>
        </div>
        <div class="form__container">
            <label for="city" class="form__label">Ville :</label>
            <button class="form__button"><i class="fas fa-home"></i></button>
            <input id="city" class="form__input" type="text" placeholder="Votre ville">
            <span class="missing-city"></span>
        </div>
            <div class="form__container">
                <label for="email" class="form__label">email :</label>
                <button class="form__button"><i class="fas fa-envelope"></i></button>
                <input id="email" class="form__input" type="text" placeholder="Votre adresse email">
                <span id="text"></span>
                <span class="missing-email"></span>
            </div>
        </form>
        `;

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

        /*****************Début Validation du formulaire******************/

        const textAlert = (value) => {
            return `${value}: Pas de chiffres et symboles. Nom compris entre 3 et 20 caractères.`
        }
        //RegExp pour prénom, nom et ville
        const regExpNamesCity = (value) => {
            return  /^([A-Za-z]{3,20}\-{0,1})?([A-Za-z]{3,20})$/.test(value);
        };

        const regExpAddress = (value) => {
            return /^[0-9]{1}[A-Za-z\s-]{3,30}$/.test(value);
        };

        const regExpEmail = (value) => {
            return /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/.test(value);
        }


        function firstNameCheck() {
        //Prénom validation
        const firstNameValidation = formValues.firstName;
        if (regExpNamesCity(firstNameValidation)) {
            document.querySelector(".missing-firstname").innerHTML = '<i class="fas fa-check-circle" id="form-success"></i>';
            return true;
        } else {
            document.querySelector(".missing-firstname").innerHTML = '<i class="fas fa-times-circle" id="form-warning"></i>';
            alert(textAlert("Prénom"));
            return false;
        };
        }

        
        function lastNameCheck() {
            const lastNameValidation = formValues.lastName;
            if (regExpNamesCity(lastNameValidation)) {
                document.querySelector(".missing-lastname").innerHTML = '<i class="fas fa-check-circle" id="form-success"></i>';
                return true;
            } else {
                document.querySelector(".missing-lastname").innerHTML = '<i class="fas fa-times-circle" id="form-warning"></i>';
                alert(textAlert("Nom"));
                return false;
            };
            }

            function addressCheck() {
                const addressValidation = formValues.address;
                if (regExpAddress(addressValidation)) {
                    document.querySelector(".missing-address").innerHTML = '<i class="fas fa-check-circle" id="form-success"></i>';
                    return true;
                } else {
                    document.querySelector(".missing-address").innerHTML = '<i class="fas fa-times-circle" id="form-warning"></i>';
                    alert("L'adresse doit comporter un chiffre puis des lettres.");
                    return false;
                };
                }

                function cityCheck() {
                    const cityValidation = formValues.city;
                    if (regExpNamesCity(cityValidation)) {
                        document.querySelector(".missing-city").innerHTML = '<i class="fas fa-check-circle" id="form-success"></i>';
                        return true;
                    } else {
                        document.querySelector(".missing-city").innerHTML = '<i class="fas fa-times-circle" id="form-warning"></i>';
                        alert("L'adresse doit comporter un chiffre puis des lettres.");
                        return false;
                    };
                    }

                function emailCheck() {
                    const emailValidation = formValues.email;
                    if (regExpEmail(emailValidation)) {
                        document.querySelector(".missing-email").innerHTML = '<i class="fas fa-check-circle" id="form-success"></i>';
                        return true;
                    } else {
                        document.querySelector(".missing-email").innerHTML = '<i class="fas fa-times-circle" id="form-warning"></i>';
                        alert("L'adresse mail n'est pas conforme. Suivez l'exemple : toto123@gmail.com");
                        return false;
                    };
                    }

        //Contrôle de la validité du form avant envoi dans le localStorage
        if(firstNameCheck() && lastNameCheck() && addressCheck() && cityCheck() && emailCheck()){
            //Mettre l'objet formValues dans le localStorage
            localStorage.setItem("formValues", JSON.stringify(formValues));
        } else {
            alert("Veuillez remplir correctement le formulaire");
        }
        /**************************Fin Validation formulaire***************/


        
        /**************************Envoi des données au serveur******************/
        function sendData() {
            const toSend = {
                products: localStorageProduct.map((product) => product.id),
                contact: formValues
            }
    
                //Envoi des données toSend au serveur
                const promise = fetch("http://localhost:3000/api/cameras/order", {
                    method: "POST",
                    body: JSON.stringify(toSend),
                    headers: {"Content-Type" : "application/json"},
                })
                .then((response) => response.json())
                .then((data) => {
                const localStorageFinalPrice = JSON.parse(localStorage.getItem("finalPrice"));
                console.log(localStorageFinalPrice);
                window.location.href = "confirmation.html?orderId=" + data.orderId;
                })
                .catch(function(error) {
                    alert(error);
                })
                console.log(promise);
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