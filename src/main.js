import { createInterface } from 'node:readline/promises';
import { getCommand } from './getCommand.js';
import { parseArgs } from './args.js';
import { homedir } from 'os';

const NAME = parseArgs();
const HOME_DIR = homedir();

const main = async () => {
  process.chdir(HOME_DIR);
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
    const workdir = process.cwd();
    const data = input.trim();
    try {
      if (data && data.split(' ')[0] === '.exit') {
        closeInterface();
      } else {
        getCommand(data);
        if (workdir !== process.cwd())
          readlineInterface.setPrompt(
            `You are currently in ${process.cwd()} \n`
          );
        readlineInterface.prompt();
      }
    } catch (e) {
      console.log('Invalid input');
      readlineInterface.prompt();
    }
  });

  readlineInterface.on('SIGINT', () => {
    closeInterface();
  });
};

await main();
