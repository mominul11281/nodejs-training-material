const express = require('express');
const adminController = require('../controllers/admin');
const validator = require('../middlewares/validation');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file) {
            cb(null, 'images');
        } else {
            cb('No file found', null);
        }
    },
    filename: (req, file, cb) => {
        if (file) {
            cb(
                null,
                file.originalname.split('.')[0].replace(/\ /g, '') +
                    Date.now() +
                    path.extname(file.originalname)
            );
        } else {
            cb('No file found', null);
        }
    },
});

const checkImage = (req, file, cb) => {
    if (file) {
        if (
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/png'
        ) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    } else {
        cb('No file found', false);
    }
};

const upload = multer({
    storage: fileStorage,
    limits: 30000,
    fileFilter: checkImage,
});

router.post(
    '/add-product',
    upload.single('productImage'),
    //diffenent approach
    // upload.array('productImage',10),
    // upload.fields([{ name: 'coverImage', maxCount: 2 }, { name: 'logoImage', maxCount: 1 }]),
    // upload.none()
    validator.createProduct,
    adminController.postProduct
);

router.put(
    '/edit-product/:productId',
    upload.single('productImage'),
    validator.updateProduct,
    adminController.postEditProduct
);

router.delete('/delete-product/:productId', adminController.deleteProduct);

module.exports = router;
