const fs = require('fs');
const path = require('path')
const readline = require('readline');
const filePath = path.join(__dirname, 'text.txt');


function write(filePath) {
    const writableStream = fs.createWriteStream(filePath, {flags:'a'});

    writableStream.on('error',  (error) => {
        console.log(error);
    });

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Введите текст: '
    });

    rl.prompt();
      
    rl.on('line', (line) => {
        switch (line.trim()) {
            case 'exit':
                rl.close();
                break;
            default:
                sentence = line + '\n'
                writableStream.write(sentence);
                rl.prompt();
                break;
        }
    }).on('close', () => {
        writableStream.end();
        writableStream.on('finish', () => {
            console.log(`\nДо скорой встречи`);
        })
        setTimeout(() => {
            process.exit(0);
        }, 100);
    });
}

write(filePath)

