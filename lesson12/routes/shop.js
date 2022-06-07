const express = require('express');
const shopController = require('../controllers/shop');
const router = express.Router();
const validator = require('../middlewares/validation');
const { checkAuth } = require('../middlewares/auth');


router.get('/', shopController.getHome);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', checkAuth, shopController.getCart);

router.post('/cart', checkAuth, validator.cart, shopController.postCart);

router.delete('/remove-product-cart', checkAuth, validator.cart, shopController.postCartDeleteProduct);



module.exports = router;