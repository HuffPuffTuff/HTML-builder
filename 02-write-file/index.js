const path = require('path');
const fs = require('fs');

const { stdin, stdout } = process;
const filePath = path.resolve(__dirname, 'text.txt');

const output = fs.createWriteStream(filePath, 'utf-8');
stdout.write('Hi, write your text: ');

const exitCommand = ['exit'];

stdin.on('data', (data) => {
  const buffer = data.toString().trim();

  if (exitCommand.includes(buffer)) {
    process.exit()
  } else {
    output.write(data);
    stdout.write('Hi, write your text: ');
  }
});

process.on('exit' ,() => stdout.write('By, by'));


