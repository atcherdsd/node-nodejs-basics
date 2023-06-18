import { access, copyFile, mkdir, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const copy = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    const srcFolder = path.join(__dirname, 'files');

    try {
        await access(srcFolder);

        const newFolder = new URL(
            './files_copy',
            import.meta.url
        );
        await mkdir(newFolder);

        const direntObjectsArray = await readdir(srcFolder, { withFileTypes: true });
        for (const file of direntObjectsArray) {
            await copyFile(
                path.join(srcFolder, file.name), 
                path.join(newFolder.pathname.slice(1), file.name)
            );
        }
    } catch (err) {
        if (err.code === 'ENOENT' || err.code === 'EEXIST')
            throw Error('FS operation failed')
        else
            throw Error(err.message)
    }
};

await copy();
