const path = require('path');
const fs = require('fs');

const dir = path.resolve(__dirname, 'secret-folder');

fs.readdir(
  dir, 
  { withFileTypes: true },
  (err, files) => {

    if (err) throw err;
    
    console.log("\nCurrent directory files information: ");
    
    files.forEach( file => {
        
      if (file.isFile() === true) {
        const extName = path.extname(file.name).slice(1);
        const fileName = file.name.slice(0, -(extName.length + 1));
        const filePath = path.resolve(__dirname, 'secret-folder', file.name)

        fs.stat(filePath, (err, stats) => {
          if (err) throw err;
          const fileSize = stats.size / 1024;
          console.log(`${fileName} - ${extName} - ${fileSize}kb`)
        });
      };
    });
  }
)