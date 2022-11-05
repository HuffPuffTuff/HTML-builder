const path = require('path');
const fs = require('fs');

const stylesPath = path.resolve(__dirname, 'styles');
const assetsPath = path.resolve(__dirname, 'assets')
const projectDistPath = path.resolve(__dirname, 'project-dist')
const cssBundlePath = path.resolve(projectDistPath, 'style.css');
const cssBundleWrite = fs.createWriteStream(cssBundlePath);
const htmlPath = path.resolve(__dirname, 'template.html');
const componentsPath = path.resolve(__dirname, 'components')
const htmlBundlePath = path.resolve(projectDistPath, 'index.html');


// Create project-dist
fs.mkdir(
  path.join(projectDistPath),
  { recursive: true},
  (err) => {
    if (err) throw err;
  }
);

// Create project-dist/assets
fs.mkdir(
  path.join(projectDistPath, 'assets'),
  { recursive: true},
  (err) => {
    if (err) throw err;
  }
)

// Merge styles
fs.readdir(
  stylesPath,
  { withFileTypes: true },
  (err, files) => {
    if (err) throw err;
      
    files.forEach(file => {
      const fileName = file.name;
      const extName = path.extname(fileName).trim();
      
      if (file.isFile() && extName === '.css') {
        const filePath = path.resolve(stylesPath, fileName);
        const readStream = fs.createReadStream(filePath, 'utf-8');

        readStream.pipe(cssBundleWrite);
      }
    });
  }
);

// Copy assets 
fs.readdir(
  assetsPath,
  { withFileTypes: true },
  (err, assets) => {
    if (err) throw err;

    assets.forEach(folder => {
      if (folder.isDirectory()) {
        fs.mkdir(
          path.join(projectDistPath, 'assets', folder.name),
          { recursive: true},
          (err) => {
            if (err) throw err;
          }
        );

        const folderPath = path.resolve(assetsPath, folder.name);

        fs.readdir(
          folderPath,
          { withFileTypes: true },
          (err, files) => {
            if (err) throw err;

            files.forEach( file => {
              const filePath = path.resolve(folderPath, file.name);
              const copyPath = path.resolve(projectDistPath, 'assets', folder.name, file.name)
              
              fs.copyFile(filePath, copyPath, (err) => {
                if (err) throw err;
              });
            });
          }
        );
      }
    });
  }
);


// Html 

fs.readFile(htmlPath, 'utf-8', (error, fileContent) => {
  if (error) throw error;
  fs.readdir(componentsPath,
    { withFileTypes: true },
    (error, componentsFiles) => {
      if (error) throw error;

      componentsFiles.forEach( (file, i) => {
        const extName = path.extname(file.name).trim();
        const filePath = path.resolve(componentsPath, file.name);
        const fileName = file.name.slice(0, -extName.length);

        if (file.isFile() && extName === '.html') {

          fs.readFile(filePath, 'utf-8', (err, componentFile) => {
            if (err) throw err;
            const htmlBundleWrite = fs.createWriteStream(htmlBundlePath, 'utf-8');
            fileContent = fileContent.replace(`{{${fileName}}}`, componentFile);
            
            htmlBundleWrite.write(fileContent)
          });
        }
      });
    });
    
    
})