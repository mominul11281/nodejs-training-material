const { getDb } = require('../config/database');
const mongodb = require('mongodb');


class Product {
    constructor(title, price, description, imageUrl, id) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id;
    }

    async save() {
        try {
            const db = getDb();
            if (this._id) {
                this._id = mongodb.ObjectId(this._id);
                await db.collection('products').updateOne({ _id: this._id }, { $set: this });
            } else {
                await db.collection('products').insertOne(this);
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    static async fetchAll() {
        try {
            const db = getDb();
            const products = await db.collection('products').find().toArray();
            return products
        } catch (error) {
            throw new Error(error);
        }
    }

    static async findById(prodId) {
        try {
            const db = getDb();
            const product = await db.collection('products').findOne({ _id: mongodb.ObjectId(prodId) });
            // return product;
            if (product) {
                return new Product(product.title, product.price, product.description, product.imageUrl, prodId);
            }
            return null;
        } catch (error) {
            throw new Error(error);
        }
    }

    static async deleteById(prodId) {
        try {
            const db = getDb();
            await db.collection('products').deleteOne({ _id: mongodb.ObjectId(prodId) });
        } catch (error) {
            throw new Error(error);
        }
    }

    

}
module.exports = Product;


// previous day work
// const fs = require('fs');
// const path = require('path');

// const productDataPath = path.join(__dirname,'..' ,'data', 'product.json');

// class Product{
//     constructor(title, price, description, imageUrl, id) {
//         this.title = title;
//         this.price = price;
//         this.description = description;
//         this.imageUrl = imageUrl;
//         this.id = parseInt(id);
//     }

//     save() {
//         if (this.id) {
//             //update-product
//             fs.readFile(productDataPath, (err, data) => {
//                 if (!err) {
//                     const products = JSON.parse(data);
//                     const updatedProducts = products.map((product) => {
//                         if (product.id.toString() === this.id.toString()) return this;
//                         return product;
//                     });
//                     fs.writeFile(productDataPath, JSON.stringify(updatedProducts), (err2) => {
//                         if (err2) {
//                             console.log(err2);
//                             throw new Error("Can't Update product");
//                         }
//                     })
//                 } else {
//                     console.log(err);
//                     throw new Error("Can't Update product");
//                 }
//             });
//         } else {
//             //add-product
//             fs.readFile(productDataPath, (err, data) => {
//                 if (!err) {
//                     const products = JSON.parse(data);
//                     const id = products.length ? products[products.length - 1].id + 1 : 1;
//                     products.push({ ...this, id });
//                     fs.writeFile(productDataPath, JSON.stringify(products), (err2) => {
//                         if (err2) {
//                             console.log(err2);
//                             throw new Error("Can't add product");
//                         }
//                     })
//                 } else {
//                     console.log(err);
//                     throw new Error("Can't add product");
//                 }
//             });
//         }
//     }

//     static fetchAll() {
//         const data = fs.readFileSync(productDataPath);
//         return JSON.parse(data);
//     }

//     static findById(prodId) {
//         const products = this.fetchAll();
//         const product = products.find(prod => {
//             return prod.id.toString() === prodId;
//         })
//         return product;
//     }

//     static deleteById(prodId) {
//         const products = this.fetchAll();
//         const updatedProducts = products.filter((product) => {
//             if (product.id.toString() === prodId) {
//                 return false;
//             }
//             return true;
//         });
//         fs.writeFile(productDataPath, JSON.stringify(updatedProducts), (err) => {
//             if (err) {
//                 console.log(err);
//                 throw new Error("Can't delete Product");
//             }
//         });
//     }
// }

// module.exports = Product;