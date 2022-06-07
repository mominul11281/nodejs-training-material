// 1. user will click add to Cart, the product will be added to that user Cart.apply
// 2. if the user click add to cart again in the the same product, the quantity will be updated by 1.
// 3. if the user click add to cart to another product, the product will be added to cart as well
//

/*
Cart {
    userId: 'user id' => req.user,
    products: [{
        product: 'product id',
        quantity: 1
    }]
}

*/

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product',
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
});

cartSchema.methods.addToCart = async function (prodId) {
    try {
        const productIndex = this.products.findIndex(
            (prod) => prod.product.toString() === prodId.toString()
        );
        if (productIndex >= 0) {
            this.products[productIndex].quantity++;
        } else {
            this.products.push({
                product: prodId,
                quantity: 1,
            });
        }
        await this.save();
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

cartSchema.methods.removeFromCart = async function (prodId) {
    try {
        this.products = this.products.filter(
            (prod) => prod.product.toString() !== prodId.toString()
        );
        await this.save();
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
