const fs = require('fs');
const path = require('path')
const filePath = path.join(__dirname, '..', '01-read-file', 'text.txt');
fs.readFile(filePath, 'utf8', (err, data) => {
  console.log(data);
});
