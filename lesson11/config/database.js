const mongoose = require('mongoose');


const databaseConnection = async (callback)=>{
    try {
        const client = await mongoose.connect(process.env.DATABASE_URI);
        if (client) console.log("Database connection is successfull!!");
        callback();
    } catch (error) {
        throw new Error(error.message);
    }
}


module.exports = databaseConnection;