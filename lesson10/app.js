const express = require('express');
const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const { failure } = require('./utils/commonResponse');
const HTTP_STATUS = require('./utils/httpStatus');
const dotenv = require('dotenv');
const databaseConnection = require('./config/database');
const cors = require('cors');
const User = require('./models/user');
// const mongoose = require('mongoose');

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// resolve the cors issue
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// })
// alernative way
app.use(cors());

//demo user for every request-response cycle. using it for cart.
app.use(async (req, res, next) => {
    try {
        req.user = await User.findById('62998ed35c9e041de7e4f284');
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

//alternative way to connect database
// mongoose.connect(process.env.DATABASE_URI).then(res=>{
//     app.listen(3000, () => {
//         console.log('Application is running on 3000');
//     });
// }).catch(err => {
//     console.log(err);
// });

databaseConnection(() => {
    User.find().then(user => {
        if (!user.length) {
            const newUser = new User({ name: "Mominul", email: "mominul@gmail.com" });
            newUser.save().then(res=>{console.log(res)}).catch(err=>{console.log(err)})
        }
    }).catch(err => { console.log(err) });
    app.listen(3000, () => {
        console.log('Application is running on 3000');
    });
})

