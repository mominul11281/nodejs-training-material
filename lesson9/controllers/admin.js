const Product = require('../models/product');
const { success, failure } = require('../utils/commonResponse');
const HTTP_STATUS = require('../utils/httpStatus');

class AdminController {
    async postProduct(req, res, next) {
        try {
            const title = req.body.title;
            const price = req.body.price;
            const description = req.body.description;
            const imageUrl = req.body.imageUrl;
            const product = new Product(title, price, description, imageUrl);
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
            const prodId = req.params.productId;
            // const updatedTitle = req.body.title;
            // const updatedPrice = req.body.price;
            // const updatedDescription = req.body.description;
            // const updatedImageUrl = req.body.imageUrl;

            // const updatedProduct = new Product(
            //     updatedTitle,
            //     updatedPrice,
            //     updatedDescription,
            //     updatedImageUrl,
            //     prodId
            // );
            const updatedProduct = await Product.findById(prodId);
            if (updatedProduct) {
                updatedProduct.title = req.body.title? req.body.title: updatedProduct.title;
                updatedProduct.price = req.body.price? req.body.price: updatedProduct.price;
                updatedProduct.description = req.body.description? req.body.description: updatedProduct.description;
                updatedProduct.imageUrl = req.body.imageUrl? req.body.imageUrl: updatedProduct.imageUrl;
                // if (req.body.title) {
                //     updatedProduct.title = req.body.title;
                // }
                // if (req.body.price) {
                //     updatedProduct.price = req.body.price;
                // }
                // if (req.body.description) {
                //     updatedProduct.description = req.body.description;
                // }
                // if (req.body.imageUrl) {
                //     updatedProduct.imageUrl = req.body.imageUrl;
                // }
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
            await Product.deleteById(prodId);
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
