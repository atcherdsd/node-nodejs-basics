import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';
import { Worker } from 'worker_threads';

const performCalculations = async () => {
    const pathToWorkerFile = path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        'worker.js'
    );
    const numberOfCPU = os.cpus().length;
    const initialValue = 10;

    const workersPromiseArray = Array(numberOfCPU).fill(1)
        .map((elem, i) => {
            return elem = new Promise((resolve, reject) => {
                const worker = new Worker(
                    pathToWorkerFile, 
                    { workerData: initialValue + i }
                );
                worker.on('message', resolve);
                worker.on('error', reject);
                worker.on('exit', (code) => {
                    if (code !== 0)
                        reject(
                            new Error(
                                `Worker stopped with exit code ${code}`
                            )
                        );
                });
            });
        });
    
    let settledResultsArray = await Promise.allSettled(workersPromiseArray);
    settledResultsArray = settledResultsArray.map(({ status, value }) => {
        return (
            status === 'fulfilled' 
                ? { status: 'resolved', data: value }
                : { status: 'error', data: null }
        )
    });
    console.log(settledResultsArray);
};

await performCalculations();
