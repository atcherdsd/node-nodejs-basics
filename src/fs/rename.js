import { access, rename as fileRename } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const rename = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const fileToRename = path.join(__dirname, 'files', 'wrongFilename.txt');
    const newFileName = path.join(__dirname, 'files', 'properFilename.md');

    let isNewFileName = true;

    try {
        try {
            await access(newFileName);
        } catch {
            isNewFileName = false;
        }
        if(!isNewFileName)
            await fileRename(fileToRename, newFileName)
        else
            throw Error('FS operation failed')
    } catch (err) {
        if (err.code === 'ENOENT' || err.code === 'EEXIST')
            throw Error('FS operation failed')
        else
            throw Error(err.message)
    }
};

await rename();
