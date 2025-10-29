import { dirname } from 'path';
import { platform, EOL } from 'os';

import { config } from './config.js';
import { commands } from './commands.js';

export const isRootDirectory = (path) => {
  const currentPlatform = platform();

  if (currentPlatform === 'win32') {
    return path === dirname(path);
  } else {
    return path === '/';
  }
};

export const showCurrentPath = () =>
  console.log(`\nYou are currently in ${config.currentDir}`);

export const welcome = () =>
  console.log(`Welcome to the File Manager, ${config.username}!`);

export function closeApp() {
  console.log(
    `${EOL}Thank you for using File Manager, ${config.username}, goodbye!`
  );
  process.exit(0);
}

export const processCommand = async (input) => {
  try {
    if (!input) {
      return;
    }

    const [command, ...args] = input.split(' ');
    const isCommandValid = command in commands;

    if (isCommandValid) {
      await commands[command](...args);
    } else {
      console.log(`⚠️ Invalid input: ${error.message}`);
    }
  } catch (error) {
    console.log(`⚠️ Operation failed: ${error.message}`);
  }
  showCurrentPath();
};
