import {ProductService} from "./services/ProductService.js";

init();

async function init() {

    const productService = new ProductService();

    let params = new URLSearchParams(window.location.search);
    let productId = params.get("id");

    const retrieveProduct = await productService.getProduct(productId);
    productService.displayProduct(retrieveProduct);

}