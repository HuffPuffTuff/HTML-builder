const path = require('path');
const fs = require('fs');

const dir = path.resolve(__dirname, 'files');

fs.mkdir(
  path.join(__dirname, 'files-copy'),
  { recursive: true },
  (err) => {
    if (err) return console.error(err);

    console.log('Directory created successfully!');
  }
);


fs.readdir(
  dir,
  (err, files) => {
    if (err) throw err;
    
    files.forEach( file => {
      const filePath = path.resolve(__dirname, 'files', file);
      const copyPath = path.resolve(__dirname, 'files-copy', file);

      fs.copyFile(filePath, copyPath, (err) => {
        if (err) throw err;
        console.log(`/files/${file} was copied to /files-copy/${file}`);
      });
    });
  }
)
// fs.copyFile()

// console.log(dir)
