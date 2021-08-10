import { CartService } from "./services/CartService.js";
const cartService = new CartService();
init();
deleteItem();
updateTotal();
displayForm();


function init() {

    const cart = cartService.getCart();
    cartService.displayCart(cart);
}

export function deleteItem(id) {
    cartService.deleteItem(id);
}

export function updateTotal() {
    cartService.updateTotal();
}

function displayForm() {
    cartService.displayForm();
}