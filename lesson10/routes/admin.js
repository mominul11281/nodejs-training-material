const express = require('express');
const adminController = require('../controllers/admin');
const validator = require('../middlewares/validation');

const router = express.Router();

router.post(
    '/add-product',
    validator.createProduct,
    adminController.postProduct
);

router.put('/edit-product/:productId',validator.updateProduct, adminController.postEditProduct);

router.delete('/delete-product/:productId', adminController.deleteProduct);

module.exports = router;
