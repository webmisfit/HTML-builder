const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'secret-folder');

fs.readdir(filePath, { withFileTypes: true }, function (err, fileNames) {
  for (let fileName of fileNames) {
    if (!fs.statSync(filePath + '/' + fileName.name).isDirectory()) {
      let x = path.parse(filePath + '/' + fileName.name);
      let size = (fs.statSync(filePath + '/' + fileName.name).size / 1024).toFixed(3);
      console.log(`${x.name} - ${x.ext.slice(1)} - ${size}кб`);
    }
  }
});
