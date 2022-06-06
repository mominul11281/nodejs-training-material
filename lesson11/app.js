const express = require('express');
const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const { failure } = require('./utils/commonResponse');
const HTTP_STATUS = require('./utils/httpStatus');
const dotenv = require('dotenv');
const databaseConnection = require('./config/database');
const cors = require('cors');
const User = require('./models/user');
const path = require('path');

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// alternative way
// app.use(multer({ dest: 'images' }).single('productImage'));
// alernative way
app.use(cors());
app.use('/images',express.static(path.join(__dirname, 'images')));

//demo user for every request-response cycle. using it for cart.
app.use(async (req, res, next) => {
    try {
        req.user = await User.findById('629d6fd29c80b033e9ce2401');
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

