const express = require('express');
const shopController = require('../controllers/shop');
const router = express.Router();


router.get('/', shopController.getHome);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/remove-product-cart', shopController.postCartDeleteProduct);



module.exports = router;