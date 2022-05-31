const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();


router.get('/add-product', adminController.getProductFormView);

router.post('/add-product', adminController.postProduct);

router.get('/products', adminController.getAdminProducts);


router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.deleteProduct);


module.exports = router;