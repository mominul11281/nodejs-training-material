const Cart = require('../models/cart');
const Product = require('../models/product');
const { success, failure } = require('../utils/commonResponse');
const HTTP_STATUS = require('../utils/httpStatus');

class ShopController {
    async getHome(req, res, next) {
        try {
            const products = await Product.fetchAll();
            return res
                .status(HTTP_STATUS.OK)
                .send(
                    success('All products are fetched successfully', products)
                );
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async getProduct(req, res, next) {
        try {
            const prodId = req.params.productId;
            const product = await Product.findById(prodId);
            if (product) {
                return res.status(HTTP_STATUS.OK).send(success('Product Found', product));       
            }
            return res.status(HTTP_STATUS.OK).send(success('Product not Found'));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async postCart (req, res, next) {
        try {
            const prodId = req.body.productId;
            const cart = await Cart.findCartByUser(req.user._id);
            // check if any cart exists under the reqested user.
            if (cart) {
                //if exists, then add the product to that user cart
                await Cart.addToCart(req.user._id, prodId);
            } else {
                // if doesn't exists, then create a cart for that user first
                const newCart = new Cart(req.user._id);
                await newCart.save();
                // then add the product to that user cart
                await Cart.addToCart(req.user._id, prodId);
            }
            return res.status(HTTP_STATUS.OK).send(success('Product is added to cart'));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async postCartDeleteProduct (req, res, next){
        try {
            const prodId = req.body.productId;
            const cart = await Cart.findCartByUser(req.user._id);
            // check if any cart exists under the reqested user.
            if (cart) {
                //if exists, then remove the product from that user cart
                await Cart.removeFromCart(req.user._id, prodId);
            } else {
                return res.status(HTTP_STATUS.NOT_FOUND).send(failure("Cart doesn't exist!!"));
            }
            return res.status(HTTP_STATUS.OK).send(success('Product is removed from cart'));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
      
    async getCart (req, res, next){
        try {
            const products = await Cart.getCart(req.user._id);
            return res.status(HTTP_STATUS.OK).send(success('Products are fetched from cart', products));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
      

}

module.exports = new ShopController();
