import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { fileURLToPath } from 'url';
import { createGunzip } from 'zlib';

const decompress = async () => {
    const pathToFiles = (name) => {
        return path.join(
            path.dirname(fileURLToPath(import.meta.url)),
            'files',
            name
        )
    };
    const pathToArchive = pathToFiles('archive.gz');
    const pathTofileToDecompress = pathToFiles('fileToDCompress.txt');
    
    try {
        const readStreamSource = createReadStream(pathToArchive);
        const writeStreamDest = createWriteStream(pathTofileToDecompress);
        const gunzip = createGunzip();
        await pipeline(readStreamSource, gunzip, writeStreamDest);
    } catch (err) {
        throw Error(err.message);
    }
};

await decompress();
