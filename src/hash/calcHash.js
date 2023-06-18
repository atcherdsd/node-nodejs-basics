import { fileURLToPath } from 'url';
import path from 'path';
import { readFile } from 'fs/promises';
import { createHash } from 'crypto';

const calculateHash = async () => {
    const fileToHashCalc = path.join(
        path.dirname(fileURLToPath(import.meta.url)), 
        'files', 
        'fileToCalculateHashFor.txt'
    );
    try {
        const data = await readFile(fileToHashCalc, {
            encoding: 'utf8',
        });
        const hash = createHash('sha256').update(data).digest('hex');
        console.log(hash);
    } catch (error) {
        throw Error(error.message)
    }
};

await calculateHash();
