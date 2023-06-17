import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { fileURLToPath } from 'url';
import { createGzip } from 'zlib';

const compress = async () => {
    const pathToFiles = (name) => {
        return path.join(
            path.dirname(fileURLToPath(import.meta.url)),
            'files',
            name
        )
    };
    const pathToFileToCompress = pathToFiles('fileToCompress.txt');
    const pathToArchive = pathToFiles('archive.gz');
    try {
        const readStreamSource = createReadStream(pathToFileToCompress);
        const writeStreamDest = createWriteStream(pathToArchive);
        const gzip = createGzip();
        await pipeline(readStreamSource, gzip, writeStreamDest);
    } catch (err) {
        throw Error(err.message);
    }
};

await compress();
