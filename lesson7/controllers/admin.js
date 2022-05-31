const Product = require('../models/product');

class AdminController {
    getProductFormView(req, res, next) {
        res.render('admin/edit-product', {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            editing: false,
        });
    }

    postProduct(req, res, next) {
        try {
            const title = req.body.title;
            const price = req.body.price;
            const description = req.body.description;
            const imageUrl = req.body.imageUrl;
            const product = new Product(title, price, description, imageUrl);
            product.save();
            res.redirect('/');
        } catch (error) {
            next(error);
        }
    }

    getAdminProducts(req, res, next) {
        try {
            const products = Product.fetchAll();
            return res.render('admin/products', {
                pageTitle: 'Admin Dashboard',
                path: '/admin/products',
                products: products,
            });
        } catch (error) {
            next(error);
        }
    }

    getEditProduct(req, res, next) {
        const editMode = req.query.edit;
        if (!editMode) res.redirect('/');

        const prodId = req.params.productId;
        const product = Product.findById(prodId);

        res.render('admin/edit-product', {
            pageTitle: 'Edit product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product,
        });
    }

    postEditProduct(req, res, next) {
        try {
            const prodId = req.body.productId;
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
            res.redirect('/admin/products');
        } catch (error) {
            next(error);
        }
    }

    deleteProduct(req, res, next) {
        try {
            const prodId = req.body.productId;
            Product.deleteById(prodId);
            res.redirect('/admin/products');
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AdminController();
