const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const queryString = require('query-string');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    req.route = parsedUrl.pathname;
    const query = parsedUrl.query;
    const header = req.headers['content-type'];
    res.setHeader('content-type', 'application/json');
    let body = '';
    req.on('data', (buffer) => {
        body += buffer.toString();
    });

    req.on('end', () => {
        if (req.method !== 'GET') {
            if (header === 'application/x-www-form-urlencoded') {
                req.body = queryString.parse(body);
            } else {
                req.body = JSON.parse(body);
            }
        }

        if (req.route === '/create' && req.method === 'POST') {
            fs.readFile(path.join(__dirname, "data", "student.json"), (err, data) => {
                if (!err) {
                    let student = JSON.parse(data);
                    console.log("before adding new student", student)
                    const id = student.length ? student[student.length - 1].id + 1 : 1;
                    student.push({
                        id: id,
                        name: req.body.name,
                        email: req.body.email
                    });
                    console.log("after adding new student", student)

                    fs.writeFile(path.join(__dirname, 'data','student.json'), JSON.stringify(student), (err2) => {
                        if (!err2) {
                            res.write(JSON.stringify({ message: "Student is created successfuly" }));
                            res.end();
                        } else {
                            console.log(err2);
                            res.write(JSON.stringify({ error: "Can not create student" }));
                            res.end();
                        }
                    });
                } else {
                    console.log(err);
                    res.write(JSON.stringify({ error: "Can not read student.json" }));
                    res.end();
                }

            });
        } else if (req.route === "/get-all-students" && req.method === 'GET') {
            fs.readFile(path.join(__dirname, "data", "student.json"), (err, data) => {
                if (!err) {
                    const students = JSON.parse(data);
                    res.write(JSON.stringify({
                        message: "Succesfully fetched all students",
                        data: students
                    }));
                    res.end();
                } else {
                    console.log(err);
                    res.write(JSON.stringify({ error: "Can't read the student.json" }));
                    res.end();
                }
            });
        } else {
            res.write(JSON.stringify({ error: "NOT FOUND" }));
            res.end();
        }
        
    });

    // How to parse urlencoded data and JSON data from client
    // if (req.route === '/' && req.method === 'GET') {
    //     res.setHeader('content-type', 'text/html');
    //     res.write(
    //         `<form method="post" action="/">
    //             <input type="text" name="name"/>
    //             <input type="text" name="company" />
    //             <input type="submit" value="submit" />
    //         </form>`
    //     );
    //     res.end();
    // } else if (req.route === '/' && req.method === 'POST') {
    //     let body = '';
    //     req.on('data', (buffer) => {
    //         console.log(buffer.toString());
    //         // res.write(buffer.toString());
    //         body += buffer.toString();
    //     });
        
    //     req.on('end', () => {
    //         // console.log(body);
    //         // urlencoded data parse
    //         const data = queryString.parse(body);
    //        // const data = url.parse('?'+body, true).query;
            
    //         //Json data parse
    //         // const data = JSON.parse(body);
            

    //         // console.log(data);
    //         // console.log(data.skill);
    //         // console.log(typeof data.skill);
    //         res.setHeader('content-type', 'application/json');
    //         res.write(JSON.stringify(data));
    //         res.end();
    //     });

    // } else {
    //     res.setHeader('content-type', 'text/html');
    //     res.write('<h1>Not Found</h1>');
    //     res.end();
    // }
    
});

server.listen(3000, () => {
    console.log('App is running on 3000');
});
