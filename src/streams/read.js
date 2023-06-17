import path from 'path';
import { fileURLToPath } from 'url';
import { createReadStream } from 'fs';

const read = async () => {
    const pathToFile = path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        'files',
        'fileToRead.txt'
    );
    const readStream = createReadStream(pathToFile);
    let content = '';

    readStream.on('data', chunk => {
        content += chunk.toString();
    });
    readStream.on('end', () => process.stdout.write(content));   
    readStream.on('error', err => console.error(err.message));
};

await read();
