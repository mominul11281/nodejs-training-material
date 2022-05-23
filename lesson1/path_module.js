const path = require('path');

// console.log(path.dirname('C:/UsersBJIT/Desktop/NODEJS TRAINING CONTENT/lesson_1/path.js'));
// console.log(path.extname('cat.jpeg'));
// console.log(path.format({
//     // dir: 'Dir',
//     root: 'Root',
//     base: 'Base',
//     name: 'name',
//     ext: '.js'
// }));

console.log(path.isAbsolute('/foo/bar')) // true
// path.isAbsolute('/baz/..'),  // true
// path.isAbsolute('qux/'),     // false
//     path.isAbsolute('.'))        // false);

// console.log('C:/Users/BJIT/Desktop/NODEJS TRAINING CONTENT/lesson_1/path.js');
// console.log(path.join('C:', 'Users', 'BJIT', 'Desktop', 'NODEJS TRAINING CONTENT', 'lesson_1', 'path.js'));
// console.log(path.parse('C:/Users/BJIT/Desktop/NODEJS TRAINING CONTENT/lesson_1/path.js'));