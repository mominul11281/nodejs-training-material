const Cart = require('../models/cart');
const Product = require('../models/product');
const { success, failure } = require('../utils/commonResponse');
const HTTP_STATUS = require('../utils/httpStatus');
const { validationResult } = require('express-validator');

class ShopController {
    async getHome(req, res, next) {
        try {
            const products = await Product.find().exec();
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
            const product = await Product.findById(prodId).exec();
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
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }
            const prodId = req.body.productId;
            const cart = await Cart.findOne({userId: req.user._id}).exec();
            // check if any cart exists under the reqested user.
            if (cart) {
                //if exists, then add the product to that user cart
                await cart.addToCart(prodId);
            } else {
                // if doesn't exists, then create a cart for that user first
                const newCart = new Cart({userId: req.user._id, products: []});
                await newCart.save();
                // then add the product to that user cart
                await newCart.addToCart(prodId);
            }
            return res.status(HTTP_STATUS.OK).send(success('Product is added to cart'));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async postCartDeleteProduct (req, res, next){
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }
            const prodId = req.body.productId;
            const cart = await Cart.findOne({ userId: req.user._id }).exec();
            // check if any cart exists under the reqested user.
            if (cart) {
                //if exists, then remove the product from that user cart
                await cart.removeFromCart(prodId);
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
            const products = await Cart.findOne({userId: req.user._id}).populate('userId','name -_id').populate('products.product','title price').exec();
            return res.status(HTTP_STATUS.OK).send(success('Products are fetched from cart', products));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
      

}

module.exports = new ShopController();
