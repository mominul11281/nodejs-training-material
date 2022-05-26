const pathToRegexp = require('path-to-regexp');


const urlMatch = pathToRegexp.match('/student/:id');

console.log(urlMatch('/student/6'));
console.log(Object.keys(urlMatch('/student/6').params).length === 0);