import { argv } from 'node:process';

const parseArgs = () => {
   
    const argsList = argv.slice(2)
        .map((elem) => elem.startsWith('--') 
            ? elem = elem.slice(2) + ' is '
            : elem = elem + ', '
        )
        .join('').slice(0, -2);
    
    console.log(argsList);
};

parseArgs();
