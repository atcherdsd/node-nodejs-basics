import { open, appendFile } from 'node:fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const create = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const destinationPath = path.join(__dirname, 'files', 'fresh.txt');
    let filehandle;

    try {
        filehandle = await open(destinationPath, 'ax');
        await appendFile(filehandle, 'I am fresh and young');
        console.log('Successfully created');
        
    } catch (error) {
        if (error.code === 'EEXIST')
            throw Error('FS operation failed')
        else
            throw Error(error.message)
    } finally {
        await filehandle?.close();
    }
};

await create();
