const express = require('express');
const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const { failure } = require('./utils/commonResponse');
const HTTP_STATUS = require('./utils/httpStatus');
const dotenv = require('dotenv');
const databaseConnection = require('./config/database');
const cors = require('cors');
const path = require('path');
const authRouter = require('./routes/auth');

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/images',express.static(path.join(__dirname, 'images')));

app.use('/admin', adminRouter);
app.use(shopRouter);
app.use(authRouter);
app.use((req, res, next) => {
    res.status(HTTP_STATUS.NOT_FOUND).send(failure('NOT FOUND'));
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(
        failure('Internal Server Error!', err.message)
    );
});

databaseConnection(() => {
    app.listen(3000, () => {
        console.log('Application is running on 3000');
    });
})

