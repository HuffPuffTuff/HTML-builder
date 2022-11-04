const path = require('path');
const fs = require('fs');

const stylesPath = path.resolve(__dirname, 'styles');
const outputPath = path.resolve(__dirname, 'project-dist', 'bundle.css');
const bundleWrite = fs.createWriteStream(outputPath);

fs.readdir(
  stylesPath,
  { withFileTypes: true },
  (err, files) => {
    if (err) throw err;

    files.forEach(file => {
      const extName = path.extname(file.name).trim();
      
      if (file.isFile() && extName === '.css') {
        const fileName = file.name;
        const fileStylePath = path.resolve(__dirname,stylesPath , fileName);
        const readStream = fs.createReadStream(fileStylePath, 'utf-8');
        
        readStream.pipe(bundleWrite);
      }
    })
  }
)