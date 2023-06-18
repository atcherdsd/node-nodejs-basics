import path from 'path';
import { fileURLToPath } from 'url';
import { createWriteStream } from 'fs';

const write = async () => {
    const destPath = path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        'files',
        'fileToWrite.txt'
    );
    const readStream = process.stdin;
    const writeStream = createWriteStream(destPath);
    readStream.pipe(writeStream);   
};

await write();
