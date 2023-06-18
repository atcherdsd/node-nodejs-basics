import { rm } from 'fs/promises';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const remove = async () => {
    const fileToRemove = path.join(dirname(
        fileURLToPath(import.meta.url)), 
        'files',
        'fileToRemove.txt'
    )
    try {
        await rm(fileToRemove);
    } catch {
        throw Error('FS operation failed');
    }
};

await remove();
