import { Transform } from 'stream';
import { pipeline } from 'stream/promises';

const transform = async () => {
    const readStream = process.stdin;
    const writeStream = process.stdout;
    
    try {
        const transformStream = new Transform({
            transform(chunk, encoding, cb) {
                const chunkStringified = chunk.toString().trim();
                const reversedChunk = chunkStringified.split('').reverse().join('');
                this.push(reversedChunk + '\n');
                cb();
            }
        });
        await pipeline(readStream, transformStream, writeStream);
    } catch (err) {
        throw Error(err.message);
    }
    
};

await transform();
