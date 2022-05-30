const express = require('express');

const router = express.Router();

const Products = [];


router.get('/add-product', (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    });
});

router.post('/add-product', (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;

    Products.push({ title, price, description, imageUrl });

    res.redirect('/');
});


module.exports = {
    router,
    Products
};