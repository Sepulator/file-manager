import { createInterface } from 'readline/promises';
import { username, currentDir } from './utils.js';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const showCurrentPath = () => console.log(`You are currently in ${currentDir}`);

const processCommand = (input) => {
  showCurrentPath();
  if (!input) {
    return;
  }
};

const start = () => {
  console.log(`Welcome to the File Manager, ${username}!`);
  showCurrentPath();

  rl.on('close', () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
  });

  rl.on('line', (input) => {
    processCommand(input.trim());
  });
};

start();
