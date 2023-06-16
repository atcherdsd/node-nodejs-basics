import { readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const list = async () => {
    const pathToFolder = path.join(path.dirname(
        fileURLToPath(import.meta.url)),
        'files'
    );

    try {
        const filenamesArray = await readdir(pathToFolder);
        process.stdout.write(filenamesArray.join('\n'));
    } catch (err) {
        if (err.code === 'ENOENT')
            throw Error('FS operation failed')
        else
            throw Error(err.message)
    }
};

await list();
