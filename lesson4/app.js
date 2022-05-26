const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const queryString = require('query-string');
const pathToRegexp = require('path-to-regexp');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    req.route = parsedUrl.pathname;
    const query = parsedUrl.query;
    const header = req.headers['content-type'];

    const urlMatch = (regexpUrl) => {
        const matchFunc = pathToRegexp.match(regexpUrl);
        const isMatched = matchFunc(req.route); // { path: '/student/123', index: 0, params: { id: '123' } } or false
        if (isMatched && Object.keys(isMatched.params).length !== 0) { // Object.keys({id: '123'}) => ['id']
            req.params = isMatched.params;
        }

        return isMatched;
    }

    res.setHeader('content-type', 'application/json');
    let body = '';
    req.on('data', (buffer) => {
        body += buffer.toString();
    });

    req.on('end', () => {
        if (req.method!=='GET' && req.method!== 'DELETE' ) {
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
        } else if (urlMatch('/student/:id') && req.method == 'GET') {
            fs.readFile(path.join(__dirname, 'data', 'student.json'), (err, data) => { 
                if (!err) {
                    const students = JSON.parse(data);
                    const student = students.find((student) => {
                        return student.id.toString() === req.params.id;
                    });

                    if (student) {
                        res.write(JSON.stringify({
                            message: 'Data found',
                            data: student
                        }));
                        res.end();
                    } else {
                        res.write(JSON.stringify({
                            message: 'Data not found'
                        }));
                        res.end();
                    }
                } else {
                    console.log(err);
                    res.write(JSON.stringify({ message: "Can't fetch data" }));
                    res.end();
                }
            });
        } else if (urlMatch('/student/edit/:id') && req.method === 'PUT') {
            // DO YOUR CODE HERE
            fs.readFile(path.join(__dirname, 'data', 'student.json'), (err, data) => {
                if (!err) {
                    const students = JSON.parse(data);
                    let studentFound = false;
                    const updatedStudents = students.map((student) => {
                        if (student.id.toString() === req.params.id) {
                            const updatedStd = {}
                            updatedStd.name = req.body.name ? req.body.name : student.name;
                            updatedStd.email = req.body.email ? req.body.email : student.email;
                            studentFound = true;
                            return {
                                id: student.id,
                                ...updatedStd
                            }

                        }
                        return student;
                    });

                    if (studentFound) {
                        fs.writeFile(path.join(__dirname, 'data', 'student.json'), JSON.stringify(updatedStudents), (err2) => {
                            if (!err2) {
                                res.write(JSON.stringify({ message: "Student is updated" }));
                                res.end();
                            } else {
                                res.write(JSON.stringify({ error: "Can't update the student" }));
                                res.end();
                            }
                        })
                    } else {
                        res.write(JSON.stringify({ message: "Data not found" }));
                        res.end();
                    }
                } else {
                    console.log(err);
                    res.write(JSON.stringify({ error: "Can't read the database" }));
                    res.end();
                }
            });
            
        } else if (urlMatch('/student/delete/:id') && req.method === 'DELETE') {
            // DO YOUR CODE HERE
            fs.readFile(path.join(__dirname, 'data', 'student.json'), (err, data) => {
                if (!err) {
                    const students = JSON.parse(data);
                    let studentFound = false;
                    const newStudents = students.filter((student) => {
                        if (student.id.toString() === req.params.id) {
                            studentFound = true;
                            return false;
                        }
                        return true;
                    });

                    if (studentFound) {
                        fs.writeFile(path.join(__dirname, 'data', 'student.json'), JSON.stringify(newStudents), (err2) => {
                            if (!err2) {
                                res.write(JSON.stringify({ message: "Student is deleted" }));
                                res.end();
                            } else {
                                res.write(JSON.stringify({ error: "Can't update the student" }));
                                res.end();
                            }
                        })
                    } else {
                        res.write(JSON.stringify({ message: "Data not found" }));
                        res.end();
                    }
                } else {
                    console.log(err);
                    res.write(JSON.stringify({ error: "Can't read the database" }));
                    res.end();
                }
            });
        }
        else {
            res.write(JSON.stringify({ error: "NOT FOUND" }));
            res.end();
        }
        
    });
    
});

server.listen(3000, () => {
    console.log('App is running on 3000');
});
