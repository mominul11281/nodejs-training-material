const Product = require('../models/product');
const { success } = require('../utils/commonResponse');
const HTTP_STATUS = require('../utils/httpStatus');

class AdminController {
    postProduct(req, res, next) {
        try {
            const title = req.body.title;
            const price = req.body.price;
            const description = req.body.description;
            const imageUrl = req.body.imageUrl;
            const product = new Product(title, price, description, imageUrl);
            product.save();
            return res
                .status(HTTP_STATUS.OK)
                .send(success('Product is created successfully', product));
        } catch (error) {
            next(error);
        }
    }

    postEditProduct(req, res, next) {
        try {
            const prodId = req.params.productId;
            const updatedTitle = req.body.title;
            const updatedPrice = req.body.price;
            const updatedDescription = req.body.description;
            const updatedImageUrl = req.body.imageUrl;

            const updatedProduct = new Product(
                updatedTitle,
                updatedPrice,
                updatedDescription,
                updatedImageUrl,
                prodId
            );
            updatedProduct.save();
            return res
                .status(HTTP_STATUS.OK)
                .send(
                    success('Product is updated successfully', updatedProduct)
                );
        } catch (error) {
            next(error);
        }
    }

    deleteProduct(req, res, next) {
        try {
            const prodId = req.params.productId;
            Product.deleteById(prodId);
            return res
                .status(HTTP_STATUS.OK)
                .send(success('Product is deleted successfully'));
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AdminController();
