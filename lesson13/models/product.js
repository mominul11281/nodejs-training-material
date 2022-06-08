const mongoose = require('mongoose');

// one way to define schema
// const productSchema = new mongoose.Schema({
//     title: String,
//     price: Number,
//     imageUrl: String,
//     description: String
// });

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;