const express = require('express');
// const outerMiddleware = require('./outerMidddleware');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();


// app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());

app.use(express.urlencoded());
app.use(express.json());

app.post('/create', (req, res, next) => {
    fs.readFile(path.join(__dirname, "data", "student.json"), (err, data) => {
        if (!err) {
            let student = JSON.parse(data);
            const id = student.length ? student[student.length - 1].id + 1 : 1;
            student.push({
                id: id,
                name: req.body.name,
                email: req.body.email
            });

            fs.writeFile(path.join(__dirname, 'data', 'student.json'), JSON.stringify(student), (err2) => {
                if (!err2) {
                    // res.write(JSON.stringify({ message: "Student is created successfuly" }));
                    // res.end();
                    res.send({ message: "Student is created successfuly" });
                } else {
                    console.log(err2);
                    // res.write(JSON.stringify({ error: "Can not create student" }));
                    // res.end();
                    res.send({ error: "Can not create student" });
                }
            });
        } else {
            console.log(err);
            // res.write(JSON.stringify({ error: "Can not read student.json" }));
            // res.end();
            res.send({ error: "Can not read student.json" });
        }

    });
});

app.get('/student/:id', (req, res, next) => {
    fs.readFile(path.join(__dirname, 'data', 'student.json'), (err, data) => {
        if (!err) {
            const students = JSON.parse(data);
            const student = students.find((student) => {
                return student.id.toString() === req.params.id;
            });

            if (student) {
                // res.write(JSON.stringify({
                //     message: 'Data found',
                //     data: student
                // }));
                // res.end();
                res.send({
                    message: 'Data found',
                    data: student
                });
            } else {
                // res.write(JSON.stringify({
                //     message: 'Data not found'
                // }));
                // res.end();
                res.send({
                    message: 'Data not found'
                });
            }
        } else {
            console.log(err);
            // res.write(JSON.stringify({ message: "Can't fetch data" }));
            // res.end();
            res.send({ message: "Can't fetch data" });
        }
    });
});

// Do your code here


























// intro to express js application
// const myMiddleware = (req, res, next) => {
//     req.company = 'bjit';
//     console.log('My middleware');
//     next();
// };
// app.use('/',(req, res, next) => {
//     console.log('first middleware');
//     next();
// });

// app.route('/home').all((req, res, next) => {
//     console.log('This is auth middleware runs for every method');
//     next();
// }).get((req, res) => {
//     res.send('<h1>This is get method in home page</h1>');
// }).post((req, res) => {
//     res.send('<h1>This is post method in home page</h1>');
// }).put((req, res) => {
//     res.send('<h1>This is put method in home page</h1>');
// }).delete((req, res) => {
//     res.send('<h1>This is delete method in home page</h1>');
// });

// app.post('/home', (req, res, next) => {
//     console.log('This is auth middleware runs for every method');
//     next();
// }, (req, res) => {
//     res.send('<h1>This is post method in home page</h1>');
// });


// app.get('/home',myMiddleware,outerMiddleware,(req, res, next) => {
//     console.log('this is a middleware function');
//     res.send('<h1>This is home</h1>')
// });

// // app.use();

// app.use('/',(req, res) => {
//     console.log('Another middleware');
//     res.send(`<h1>${req.company}</h1>`); // request response cycle ends here
// });


app.listen(3000, () => {
    console.log('Application is running on 3000');
});


