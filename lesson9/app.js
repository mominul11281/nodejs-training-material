const express = require('express');
const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const { failure } = require('./utils/commonResponse');
const HTTP_STATUS = require('./utils/httpStatus');
const dotenv = require('dotenv');
const { mongodbConnection, getDb } = require('./config/database');
const mongodb = require('mongodb');

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//demo user for every request-response cycle. using it for cart.
app.use(async (req, res, next) => {
    try {
        const db = getDb();
        req.user = await db.collection('users').findOne({ _id: mongodb.ObjectId('62983e8dc011a17422514ff7') });
        next();
    } catch (error) {
        console.log(error);
        next(error)
    }
})

app.use('/admin', adminRouter);
app.use(shopRouter);
app.use((req, res, next) => {
    res.status(HTTP_STATUS.NOT_FOUND).send(failure('NOT FOUND'));
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(
        failure('Internal Server Error!', err.message)
    );
});


mongodbConnection(() => {
    console.log("MongoDB database is connected!!");
    app.listen(3000, () => {
        console.log('Application is running on 3000');
    });
})

