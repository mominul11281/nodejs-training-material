const fs = require('fs');

const fsPromise = require('fs/promises');
const os = require('os');

// synchronous read file
// const data = fs.readFileSync('index.txt',{encoding: 'utf-8'});
// console.log(data);

// asynchronous read file
// fs.readFile('index.txt', (err, data) => {
//     if (!err) {
//         console.log(data.toString());
//     } else {
//         console.log(err);
//     }
// });

// console.log('It runs before fs.readFile');

// synchronous write file
// fs.writeFileSync('output.txt', 'This is a sentence');
// fs.writeFileSync('output.txt', 'another sentence',{flag: 'a'});

// fs.writeFile('output.txt', 'This is a content', (err) => {
//     if (err) {
//         console.log(err);
//     }
// });

// fs.writeFile('output.txt', 'another content', { flag: 'a' }, (err) => {
//     if (err) {
//         console.log(err);
//     }
// });

// fs.open('index.txt', 'w', (err, fileDescription) => {
//     if (!err) {
//         fs.write(fileDescription, 'This is a content', (err1) => {
//             if (!err1) {
//                 fs.close(fileDescription, (err3) => {
//                     if (err3) {
//                         console.log("can't close the file");
//                     }
//                 });
//             } else {
//                 console.log("Can't write the content in the file", err1);
//             }
//         })
//     } else {
//         console.log("can't open the file", err);
//     }
// });

// const readfile = async () => {
//     try {
//         const data = await fsPromise.readFile('index.txt');
//         console.log(data.toString());
//     } catch (error) {
//         console.log('this is catch block', error);
//     }
// }

// readfile();

// const demoPromise = new Promise((resolve, reject) => {
//     const a = 4;
//     if (a === 5) {
//         resolve('This is true');
//     } else {
//         reject('This is false');
//     }
// });

// demoPromise.then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log('this is catch block',err);
// });