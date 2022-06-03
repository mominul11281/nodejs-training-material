const { body } = require('express-validator');

const validator = {
    createProduct: [
        body('title')
            .notEmpty()
            .withMessage('Title is required')
            .isString()
            .withMessage('Title must be string!'),
        body('price')
            .notEmpty()
            .withMessage('Price is required')
            .isNumeric()
            .withMessage('Price must be number'),
        body('imageUrl')
            .notEmpty()
            .withMessage('Image Url is required')
            .isString()
            .withMessage('Image Url is required'),
        body('description')
            .notEmpty()
            .withMessage('Description is required')
            .isString()
            .withMessage('Description is required'),
    ],
    updateProduct: [
        body('title').isString().withMessage('Title must be string!'),
        body('price').isNumeric().withMessage('Price must be number'),
        body('imageUrl').isString().withMessage('Image must be string'),
        body('description').isString().withMessage('Description must me string'),
    ],
    cart: body('productId')
        .notEmpty()
        .withMessage('Product id is required')
        .isString()
        .withMessage('Product id must be string!'),
};

module.exports = validator;
