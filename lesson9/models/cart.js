const { getDb } = require('../config/database');
const mongodb = require('mongodb');

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
class Cart {
    constructor(userId, products = []) {
        this.userId = mongodb.ObjectId(userId);
        this.products = products;
    }

    async save() {
        try {
            const db = getDb();
            await db.collection('carts').insertOne(this);
        } catch (error) {
            throw new Error(error);
        }
    }

    static async addToCart(userId, prodId) {
        try {
            const db = getDb();
            const cart = await db
                .collection('carts')
                .findOne({ userId: mongodb.ObjectId(userId) });
            const currentProducts = cart.products;
            const productIndex = currentProducts.findIndex(
                (prod) => prod.product.toString() === prodId.toString()
            );
            if (productIndex >= 0) {
                currentProducts[productIndex].quantity++;
            } else {
                currentProducts.push({
                    product: mongodb.ObjectId(prodId),
                    quantity: 1,
                });
            }
            await db
                .collection('carts')
                .updateOne(
                    { userId: mongodb.ObjectId(userId) },
                    { $set: { products: currentProducts } }
                );
        } catch (error) {
            throw new Error(error);
        }
    }

    static async findCartByUser(userId) {
        try {
            const db = getDb();
            const cart = db
                .collection('carts')
                .findOne({ userId: mongodb.ObjectId(userId) });
            return cart;
        } catch (error) {
            throw new Error(error);
        }
    }

    static async removeFromCart(userId, prodId) {
        try {
            const db = getDb();
            const cart = await db
                .collection('carts')
                .findOne({ userId: mongodb.ObjectId(userId) });
            const currentProducts = cart.products.filter(
                (prod) => prod.product.toString() !== prodId.toString()
            );

            await db
                .collection('carts')
                .updateOne(
                    { userId: mongodb.ObjectId(userId) },
                    { $set: { products: currentProducts } }
                );
        } catch (error) {
            throw new Error(error);
        }
    }

    static async getCart(userId) {
        try {
            const db = getDb();
            const cart = await db
                .collection('carts')
                .findOne({ userId: mongodb.ObjectId(userId) });
            
            let products = [];

            for (let i = 0; i < cart.products.length; i++){
                const product = await db.collection('products').findOne({ _id: cart.products[i].product } );
                products.push({
                    _id: product._id,
                    title: product.title,
                    price: product.price,
                    quantity: cart.products[i].quantity
                });
            }
            return products;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = Cart;
