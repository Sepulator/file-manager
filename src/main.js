import { createInterface } from 'node:readline/promises';
import { homedir } from 'os';

import { INVALID_INPUT } from './commands.js';
import { getCommand } from './getCommand.js';
import { parseArgs } from './args.js';

const NAME = parseArgs();
const HOME_DIR = homedir();

const main = async () => {
  process.chdir(HOME_DIR);
  const readlineInterface = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `> `,
  });

  const closeInterface = () => {
    console.log(`\nThank you for using File Manager, ${NAME}, goodbye!`);
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
      }
    } catch (e) {
      console.log(INVALID_INPUT);
    }

    console.log(`You are currently in ${process.cwd()}`);
    readlineInterface.prompt();
  });

  readlineInterface.on('SIGINT', () => {
    closeInterface();
  });
};

await main();
