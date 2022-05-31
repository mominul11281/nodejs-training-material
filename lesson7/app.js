const express = require('express');
const path = require('path');
const ejs = require('ejs');
const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');

const app = express();


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

//demo user for every request (ignore this for now)
// app.use((req, res, next) => {
//     req.user = {
//         id : 1,
//         name: 'Naruto Uzumaki',
//         email: 'naruto@gmail.com'
//     }
//     next();
// })

app.use('/admin', adminRouter);
app.use(shopRouter);
app.use((req, res, next) => {
    res.status(404).render('404', {
        pageTitle: 'Not Found',
        path: `${req.path}`
    });
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).render('500', { pageTitle: 'Server Error' , path : `${req.path}` });
})

app.listen(3000, () => {
    console.log('Application is running on 3000');
});
