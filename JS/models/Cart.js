export class Cart {
    constructor(products) {
        this.products = products;
    }

    getTotalPrice() {

        let total = 0;

        this.products.forEach( (product) => total += product.price );

        return total;

    }
}

