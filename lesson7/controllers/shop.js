const Product = require('../models/product');

class ShopController {
    getHome(req, res, next) {
        try {
            const products = Product.fetchAll();
            return res.render('shop/index', {
                pageTitle: 'Manga Shop',
                path: '/',
                products: products,
            });
        } catch (error) {
            next(error);
        }
    }

    getProduct(req, res, next) {
        const prodId = req.params.productId;
        const product = Product.findById(prodId);
        res.render('shop/product-detail', {
            pageTitle: 'Product Detail',
            path: '/products',
            product: product
        })
    }
}

module.exports = new ShopController();