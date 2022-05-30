const express = require('express');
const { Products } = require('./admin');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.render('shop', {
        pageTitle: 'Manga Shop',
        path: '/',
        products: Products
    });
})




module.exports = router;