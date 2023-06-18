import path from 'path';
import { fileURLToPath } from 'url';

import child_process from 'child_process';

const spawnChildProcess = async (args) => {
    const pathToChildProcess = path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        'files',
        'script.js'
    );
    const childProcess = child_process.fork(pathToChildProcess, args);

    childProcess.on('close', (code) => {
        console.log(`Child process close all stdio with code ${code}`);
    });
    childProcess.on('error', (err) => {
        console.error(err.message);
    });
};

spawnChildProcess(process.argv.slice(2));   // Set any arguments when running cp.js
