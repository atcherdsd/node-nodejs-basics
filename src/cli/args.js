import { argv } from 'node:process';

const parseArgs = () => {

    const argsList = argv.slice(2)
        .map(elem => elem.startsWith('--') 
            ? elem = elem.slice(2) + ' is '
            : elem = elem + ', '
        )
        .join('').trim().slice(0, -1);
    
    console.log(argsList);
};

parseArgs();
