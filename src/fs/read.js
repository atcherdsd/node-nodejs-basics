import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
    const fileToRead = path.join(path.dirname(
        fileURLToPath(import.meta.url)),
        'files',
        'fileToRead.txt'
    );
    try {
        const contents = await readFile(fileToRead, {
            encoding: 'utf8',
        });
        console.log(contents);
    } catch (err) {
        if (err.code === 'ENOENT')
            throw Error('FS operation failed')
        else
            throw Error(err.message)
    }
};

await read();
