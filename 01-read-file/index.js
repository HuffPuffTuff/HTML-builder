const path = require('path');
const fs = require('fs');

const textPath = path.join(__dirname,  'text.txt');
const readStream = fs.createReadStream(textPath, 'utf-8')

let data = '';

readStream.on('data', chunk => data += chunk);
readStream.on('end', () => console.log(data));
readStream.on('error', error => console.log('Error', error.message));
