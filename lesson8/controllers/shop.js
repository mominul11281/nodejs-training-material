const Product = require('../models/product');
const { success } = require('../utils/commonResponse');
const HTTP_STATUS = require('../utils/httpStatus');

class ShopController {
    getHome(req, res, next) {
        try {
            const products = Product.fetchAll();
            return res
                .status(HTTP_STATUS.OK)
                .send(
                    success('All products are fetched successfully', products)
                );
        } catch (error) {
            next(error);
        }
    }

    getProduct(req, res, next) {
        const prodId = req.params.productId;
        const product = Product.findById(prodId);
        if (product) {
            return res.status(HTTP_STATUS.OK).send(success('Product Found', product));       
        }

        return res.status(HTTP_STATUS.OK).send(success('Product not Found'));  
    }
}

module.exports = new ShopController();
