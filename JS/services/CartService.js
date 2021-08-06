/****************************************Récupération des articles************************************/
import {Cart} from "../models/Cart.js";


const LOCAL_STORAGE_KEY = "product";

export class CartService {
    constructor() {}

    getCart() {
        const products = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        return new Cart(products);
    }


    displayCart(cart) {
        // console.log(cart.products);
        let localStorageProduct = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        let itemRow = document.getElementById("productRow");
        const tableContainer = document.getElementById('table__container');
        // tableContainer.innerHTML = '';
        const mainContainer = document.getElementsByTagName("tbody")[0];

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
        let localStorageProduct = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        // console.log(localStorageProduct);
        let deleteBtn = document.querySelectorAll("[id^='deletebutton_']");
        // console.log(deleteBtn);

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
        let localStorageProduct = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        let totalPrice = [];

        for (let m = 0; m < localStorageProduct.length; m++) {
            let productPriceInCart = localStorageProduct[m].price;

            totalPrice.push(productPriceInCart)
            // console.log(totalPrice);
        }

        

        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const finalPrice = totalPrice.reduce(reducer, 0);

        const tableContainer = document.getElementById('table__container');
        let productsInCartContainer = document.getElementsByTagName("tr");

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

    }


    displayForm() {
        let localStorageProduct = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
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
            return  /^[A-Za-z]{3,20}$/.test(value)
        };
        //RegExp pour l'adresse
        const regExpAddress = (value) => {
            return /^[0-9]{1}[A-Za-z\s-]{3,30}$/.test(value);
        };

        //RegExp pour l'adresse email 
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

        /**************************Fin Validation formulaire***************/

        //Contrôle de la validité du form avant envoi dans le localStorage
        if(firstNameCheck() && lastNameCheck() && addressCheck() && cityCheck() && emailCheck()){
            //Mettre l'objet formValues dans le localStorage
            localStorage.setItem("formValues", JSON.stringify(formValues));
        } else {
            alert("Veuillez remplir correctement le formulaire");
        }

        const toSend = {
            localStorageProduct,
            formValues
        }
        console.log(localStorageProduct);
        console.log(toSend);
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








// //*****************Formulaire****************//
// let form = document.querySelector(".form");
// // console.log(form.surname);

// //Ecoute de la modification du nom
// form.surname.addEventListener('change', function() {
//     validSurname(this);
// });

// //Ecoute de la modification du prénom
// // form.name.addEventListener('change', function() {
// //     validName(this);
// // });

// //Ecoute de la modification du mail
// form.mail.addEventListener('change', function() {
//     validMail(this);
// });

// //Ecoute de la modification de l'adresse
// form.location.addEventListener('change', function() {
//     validLocation(this);
// });

// //Ecoute de la modification de la ville
// form.city.addEventListener('change', function() {
//     validCity(this);
// });





// /********************Validation Nom*******************/
// const validSurname = function(inputSurname) {
//     let surnameRegExp = new RegExp(
//         '/[a-zA-Z]/'
//     );

//     let small = inputSurname.nextElementSibling;

//     if(surnameRegExp.test!=(inputSurname.value)){
//         small.innerHTML = "Nom invalide.";
//         small.setAttribute("style", "color:red");
//     } 

// }


// /*********************Validation mail*******************/
// const validMail = function(inputMail) {
//     let mailRegExp = new RegExp(
//         '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g'    
//     );

//     //Récupération de la balise small
//     let small = inputMail.nextElementSibling;


//     if(mailRegExp.test(inputMail.value)){
//         small.innerHTML = "Adresse mail valide";
//         small.setAttribute("style", "color:green");
//     } else {
//         small.innerHTML = "Adresse mail invalide";
//         small.setAttribute("style", "color:red");
//     }
// }

// /******************Validation adresse postale***********/

// const validLocation = function(inputLocation) {
//     let locationRegExp = new RegExp(
//         '/[0-9] [a-z]/'
//     );

//     //Récupération de la balise small
//     let small = inputLocation.nextElementSibling;

//     if(locationRegExp.test(inputLocation.value)){
//         small.innerHTML = "Adresse postale valide";
//         small.setAttribute("style", "color:green");
//     } else {
//         small.innerHTML = "Adresse postale invalide";
//         small.setAttribute("style", "color:red");
//     }
// }

// /******************Validation ville**********/

// const validCity = function(inputCity) {
//     let cityRegExp = new RegExp(
//         '/^[A-Za-z]/gm'
//     );

//     //Récupération de la balise small
//     let small = inputCity.nextElementSibling;

//     if(cityRegExp.test(inputCity.value)){
//         small.innerHTML = "ok";
//         small.setAttribute("style", "color:green");
//     } else {
//         small.innerHTML = "Nom de ville invalide";
//         small.setAttribute("style", "color:red");
//     }
// }




//Vérifie que toutes les conditions soient remplies avant envoi au serveur
// if (
//     surnameRegExp.test == inputSurname.value &&
//     nameRegExp.test == inputName.value &&
//     mailRegExp.test == inputMail.value &&
//     locationRegExp.test == inputLocation.value &&
//     cityRegExp.test == inputCity 

// ) {
// let contact = {
//     firstName: inputSurname.value, 
//     lastName: inputName.value,
//     address: inputLocation.value,
//     city: inputCity.value,
//     email: inputMail.value
// }
// };

















// let cartStructure = []; 
// let productContainer = document.createElement("tr");

// for (k = 0; k < localStorageProduct.length; k++) {
//     console.log("J'ai " + localStorageProduct.length + " article(s) dans le panier");
//     cartStructure = cartStructure + productContainer +`
//             <td><input class="table__checkbox" type="checkbox"></td>
//         <td><img class="table__img" src="${localStorageProduct[k].product.image}"></td>
//         <td><p class="table__name">${localStorageProduct[k].product.name}</p></td>
//         <td><p class="table__price">${localStorageProduct[k].product.price / 100} €</p></td>
//         <td><input type="number" class="num" value="1"></td>
//         <td class="table__total--price"><p>${localStorageProduct[k].product.price / 100} €</p></td>
//         <td><button type="button" class="table__button">Supprimer</button></td>
//     `;
// }
//     if (k == localStorageProduct.length) {
//         productContainer.innerHTML = cartStructure;
//     }

/********************************FORMULAIRE******************************/

//Pour que l'utilisateur entre une adresse mail valide