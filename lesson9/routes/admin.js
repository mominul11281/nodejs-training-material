const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();


router.post('/add-product', adminController.postProduct);

router.put('/edit-product/:productId', adminController.postEditProduct);

router.delete('/delete-product/:productId', adminController.deleteProduct);


module.exports = router;