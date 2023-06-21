import { createInterface } from 'node:readline/promises';
import { getCommand } from './getCommand.js';
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

  readlineInterface.on('line', (input) => {
    const data = input.trim();
    try {
      getCommand(data);;
    } catch (e) {
      console.log(e);
    }
    readlineInterface.prompt();
  });
};

await main();
