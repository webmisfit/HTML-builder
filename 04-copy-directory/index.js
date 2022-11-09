const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'files');
console.log(filePath);

// fs.copyFile(__dirname+'/abc.js', __dirname+'/cba.js', (err)=>{
//     console.log('done')
// })

fs.rmdir(
  __dirname + '/copy-files',
  {
    recursive: true,
  },
  (err) => {

    fs.mkdir(__dirname + '/copy-files', (err) => {
        if (err) throw err
      
      
        fs.readdir(filePath, { withFileTypes: true }, (err, fileNames) => {
          for (let files of fileNames) {
            fs.copyFile(filePath + '/' + files.name, __dirname + '/copy-files/' + files.name, (err) => {
              if (err) throw err;
            });
          }
        });
      
      });


  },
);




