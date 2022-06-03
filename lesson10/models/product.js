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


// const { getDb } = require('../config/database');
// const mongodb = require('mongodb');


// class Product {
//     constructor(title, price, description, imageUrl, id) {
//         this.title = title;
//         this.price = price;
//         this.description = description;
//         this.imageUrl = imageUrl;
//         this._id = id;
//     }

//     async save() {
//         try {
//             const db = getDb();
//             if (this._id) {
//                 this._id = mongodb.ObjectId(this._id);
//                 await db.collection('products').updateOne({ _id: this._id }, { $set: this });
//             } else {
//                 await db.collection('products').insertOne(this);
//             }
//         } catch (error) {
//             throw new Error(error);
//         }
//     }

//     static async fetchAll() {
//         try {
//             const db = getDb();
//             const products = await db.collection('products').find().toArray();
//             return products
//         } catch (error) {
//             throw new Error(error);
//         }
//     }

//     static async findById(prodId) {
//         try {
//             const db = getDb();
//             const product = await db.collection('products').findOne({ _id: mongodb.ObjectId(prodId) });
//             // return product;
//             if (product) {
//                 return new Product(product.title, product.price, product.description, product.imageUrl, prodId);
//             }
//             return null;
//         } catch (error) {
//             throw new Error(error);
//         }
//     }

//     static async deleteById(prodId) {
//         try {
//             const db = getDb();
//             await db.collection('products').deleteOne({ _id: mongodb.ObjectId(prodId) });
//         } catch (error) {
//             throw new Error(error);
//         }
//     }

    

// }
// module.exports = Product;

