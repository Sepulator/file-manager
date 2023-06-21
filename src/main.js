import { createInterface } from 'node:readline/promises';

import { parseArgs } from './args.js';

const NAME = parseArgs();

const main = async () => {
  const readlineInterface = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `You are currently in ${process.cwd()} \n`,
  });

  console.log(`Welcome to the File Manager, ${NAME}`);
  readlineInterface.prompt();

  readlineInterface.on('line', (line) => {
    const workDir = process.cwd();
    console.log(`You are currently in ${workDir}`);
    //const currentCommand = getCommandFromData(line);
    try {
      COMMANDS[currentCommand](data);
    } catch (e) {
      //invalid command
    }
  });
};

await main();
