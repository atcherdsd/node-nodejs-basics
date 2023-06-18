import { env } from 'process';

const parseEnv = () => {
    const envVarObject = env;

    const list = Object.entries(envVarObject)
        .filter(([key,]) => key.startsWith('RSS_'))
        .map(elem => elem.join('='))
        .join('; ');
    
    console.log(list);
};

parseEnv();
