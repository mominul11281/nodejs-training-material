const fs = require('fs');

const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.on('data', (buffer) => {
    console.log(buffer.toString());
    writeStream.write(buffer.toString());
});

// readStream.pipe(writeStream);