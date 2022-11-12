const fs = require('fs');
const path = require('path');

async function createDir(_path) {
  await fs.promises.rm(_path, { recursive: true, force: true });
  await fs.promises.mkdir(_path, { recursive: true, force: true });
}

async function writeInFile(_path, value) {
  await fs.promises.appendFile(_path, value);
}

async function copyFolder(from, to) {
  let fileNames = await fs.promises.readdir(from, { withFileTypes: true });

  for (let fileName of fileNames) {
    let ext = path.extname(from + '/' + fileName.name);
    if (ext) {
      await fs.promises.copyFile(from + '/' + fileName.name, to + '/' + fileName.name);
    } else {
      await createDir(to + '/' + fileName.name);
      await copyFolder(from + '/' + fileName.name, to + '/' + fileName.name);
    }
  }
}

async function bundleFile(from, to, ext) {
  let fileNames = await fs.promises.readdir(from, { withFileTypes: true });
  for (let fileName of fileNames) {
    let fileExt = path.extname(from + '/' + fileName.name);

    if (ext === fileExt) {
      let txt = await fs.promises.readFile(from + '/' + fileName.name);
      await writeInFile(to, txt.toString());
    }
  }
}

async function insertTemplates(filePath, options) {
  // let fileData = path.parse(filePath)
  await fs.promises.copyFile(filePath, options.to + '/' + options.name);

  let fileNames = await fs.promises.readdir(options.pathOfTemplates);

  console.log(fileNames);

  for (let fileName of fileNames) {
    let ext = path.extname(fileName);
    // console.log(ext)
    if (ext === options.ext) {
      // console.log(fileName)
      let txt0 = await takeTextInFile(options.to + '/' + options.name);
      let txt1 = await takeTextInFile(options.pathOfTemplates + '/' + fileName);
      // console.log(txt.toString())

      let replacedTxt = txt0
        .toString()
        .replace(new RegExp(`{{${fileName.slice(0, -options.ext.length)}}}`, 'g'), txt1.toString());

      await fs.promises.writeFile(options.to + '/' + options.name,replacedTxt);
    }
  }
}

async function takeTextInFile(_path) {
  return await fs.promises.readFile(_path);
}

(async function () {
  await createDir(__dirname + '/project-dist');
  await createDir(__dirname + '/project-dist/assets');
  await copyFolder(__dirname + '/assets', __dirname + '/project-dist/assets');

  await insertTemplates(__dirname + '/template.html', {
    to: __dirname + '/project-dist',
    name: 'index.html',
    ext: '.html',
    pathOfTemplates: __dirname + '/components',
  });
  await bundleFile(__dirname + '/styles', __dirname + '/project-dist/style.css', '.css');
})();
