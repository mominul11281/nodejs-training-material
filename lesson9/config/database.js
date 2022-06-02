const {MongoClient} = require('mongodb');

let _db;
const mongodbConnection = async (callback)=>{
    try {
        const client = await MongoClient.connect(process.env.DATABASE_URI);
        _db = client.db();
        callback();
    } catch (error) {
        throw new Error(error.message);
    }
}


const getDb = () => {
    if (_db) return _db;
    throw new Error("No database found!");
}


module.exports = {
    mongodbConnection,
    getDb
};