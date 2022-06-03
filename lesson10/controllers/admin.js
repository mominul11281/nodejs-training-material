const Product = require('../models/product');
const { success, failure } = require('../utils/commonResponse');
const HTTP_STATUS = require('../utils/httpStatus');
const { validationResult } = require('express-validator');

class AdminController {
    async postProduct(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }
            const title = req.body.title;
            const price = req.body.price;
            const description = req.body.description;
            const imageUrl = req.body.imageUrl;
            const product = new Product({title, price, imageUrl, description});
            await product.save();
            return res
                .status(HTTP_STATUS.OK)
                .send(success('Product is created successfully', product));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async postEditProduct(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }
            const prodId = req.params.productId;
            const updatedProduct = await Product.findById(prodId).exec();
            if (updatedProduct) {
                updatedProduct.title = req.body.title? req.body.title: updatedProduct.title;
                updatedProduct.price = req.body.price? req.body.price: updatedProduct.price;
                updatedProduct.description = req.body.description? req.body.description: updatedProduct.description;
                updatedProduct.imageUrl = req.body.imageUrl? req.body.imageUrl: updatedProduct.imageUrl;
                await updatedProduct.save();
                return res
                    .status(HTTP_STATUS.OK)
                    .send(
                        success('Product is updated successfully', updatedProduct)
                );
            }
            return res
                    .status(HTTP_STATUS.NOT_FOUND)
                    .send(
                        failure('Product is not found to update')
                    );
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async deleteProduct(req, res, next) {
        try {
            const prodId = req.params.productId;
            //alternative way
            // await Product.findByIdAndRemove(prodId);
            await Product.findOneAndDelete({_id: prodId}).exec();
            return res
                .status(HTTP_STATUS.OK)
                .send(success('Product is deleted successfully'));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = new AdminController();
