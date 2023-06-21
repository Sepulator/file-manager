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

  const closeInterface = () => {
    console.log(`Thank you for using File Manager, ${NAME}, goodbye!`);
    readlineInterface.close();
    process.stdin.unref();
  };

  console.log(`Welcome to the File Manager, ${NAME}`);
  readlineInterface.prompt();

  readlineInterface.on('line', (input) => {
    const data = input.trim();

    try {
      if (data && data.split(' ')[0] === '.exit') {
        closeInterface();
      } else {
        getCommand(data);
        readlineInterface.prompt();
      }
    } catch (e) {
      console.log(e);
      readlineInterface.prompt();
    }
  });

  readlineInterface.on('SIGINT', () => {
    closeInterface();
  });
};

await main();
