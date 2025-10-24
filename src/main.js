import { createInterface } from 'readline/promises';
import { showCurrentPath, welcome, closeApp, processCommand } from './utils.js';

const start = () => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  welcome();
  showCurrentPath();

  rl.on('close', () => {
    closeApp();
  });

  rl.on('line', async (input) => {
    await processCommand(input.trim());
  });
};

start();
