const express = require('express');
const path = require('path');
const ejs = require('ejs');
const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');

const app = express();


// sub application and router application creation (demo)
// const adminApp = express();
// const adminApp = express.Router();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));
// app.set('views', 'template');
app.use('/admin', adminRouter.router);
app.use(shopRouter);
app.use((req, res, next) => {
    res.render('404', {
        pageTitle: 'Not Found',
        path: `${req.path}`
    });
})

// demo examples for sub application and path
// app.use('/admin', adminApp);
// app.get('/', (req, res, next) => {
//     console.log('This is root route');
//     console.log({
//         'req.url': req.url,
//         'req.originalPath': req.originalUrl,
//         'req.baseUrl': req.baseUrl,
//         'req.path': req.path
//     });
//     res.send('<h1>this is root route</h1>');
//     // res.sendFile(path.join(__dirname,'views','home.html'));
//     // res.render('home', { title: 'EJS' });
// });

// adminApp.get('/about', (req, res, next) => {
//     console.log('This is admin route');
//     console.log({
//         'req.url': req.url,
//         'req.originalPath': req.originalUrl,
//         'req.baseUrl': req.baseUrl,
//         'req.path': req.path
//     });
//     res.send('<h1>This is admin page</h1>');
// })

app.listen(3000, () => {
    console.log('Application is running on 3000');
});
