const fs = require('fs');
const path = require('path');

const productDataPath = path.join(__dirname,'..' ,'data', 'product.json');

class Product{
    constructor(title, price, description, imageUrl, id) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.id = parseInt(id);
    }

    save() {
        if (this.id) {
            //update-product
            fs.readFile(productDataPath, (err, data) => {
                if (!err) {
                    const products = JSON.parse(data);
                    const updatedProducts = products.map((product) => {
                        if (product.id.toString() === this.id.toString()) return this;
                        return product;
                    });
                    fs.writeFile(productDataPath, JSON.stringify(updatedProducts), (err2) => {
                        if (err2) {
                            console.log(err2);
                            throw new Error("Can't Update product");
                        }
                    })
                } else {
                    console.log(err);
                    throw new Error("Can't Update product");
                }
            });
        } else {
            //add-product
            fs.readFile(productDataPath, (err, data) => {
                if (!err) {
                    const products = JSON.parse(data);
                    const id = products.length ? products[products.length - 1].id + 1 : 1;
                    products.push({ ...this, id });
                    fs.writeFile(productDataPath, JSON.stringify(products), (err2) => {
                        if (err2) {
                            console.log(err2);
                            throw new Error("Can't add product");
                        }
                    })
                } else {
                    console.log(err);
                    throw new Error("Can't add product");
                }
            });
        }
    }

    static fetchAll() {
        const data = fs.readFileSync(productDataPath);
        return JSON.parse(data);
    }

    static findById(prodId) {
        const products = this.fetchAll();
        const product = products.find(prod => {
            return prod.id.toString() === prodId;
        })
        return product;
    }

    static deleteById(prodId) {
        const products = this.fetchAll();
        const updatedProducts = products.filter((product) => {
            if (product.id.toString() === prodId) {
                return false;
            }
            return true;
        });
        fs.writeFile(productDataPath, JSON.stringify(updatedProducts), (err) => {
            if (err) {
                console.log(err);
                throw new Error("Can't delete Product");
            }
        });
    }
}

module.exports = Product;