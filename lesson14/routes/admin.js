const express = require('express');
const adminController = require('../controllers/admin');
const validator = require('../middlewares/validation');
const multer = require('multer');
const path = require('path');
const { checkAuth, isAdmin } = require('../middlewares/auth');

const router = express.Router();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.originalname.split('.')[0].replace(/\ /g, '') +
                Date.now() +
                path.extname(file.originalname)
        );
    },
});

const checkImage = (req, file, cb) => {
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: fileStorage,
    fileFilter: checkImage,
});

router.post(
    '/add-product',
    checkAuth,
    isAdmin,
    upload.single('productImage'),
    validator.createProduct,
    adminController.postProduct
);

router.put(
    '/edit-product/:productId',
    checkAuth,
    isAdmin,
    upload.single('productImage'),
    validator.updateProduct,
    adminController.postEditProduct
);

router.delete(
    '/delete-product/:productId',
    checkAuth,
    isAdmin,
    adminController.deleteProduct
);

module.exports = router;
