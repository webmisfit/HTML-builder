const fs = require('fs');
const path = require('path');

function toBundleCss(fromDir,toFile) {
  fs.readdir(fromDir, (err, files) => {

    fs.writeFile(toFile, '', (err) => {
      if (err) console.log('Ошибка');

      for (let file of files) {
        fs.readFile(fromDir + file, 'utf8', (err, contents) => {

          let info = path.parse(fromDir + file);

          if (info.ext === '.css') {
            console.log(file);
            fs.appendFile(toFile, contents, (err) => {
              if (err) throw err
            });
          }
        });
      }
    });
  });
}


toBundleCss(__dirname+'/styles/', __dirname+'/project-dist/bundle.css')
toBundleCss(__dirname+'/test-files/styles/', __dirname+'/test-files/bundle.css')
