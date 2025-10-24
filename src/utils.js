import { dirname } from 'path';
import { argv, exit } from 'process';
import { homedir, platform, EOL } from 'os';

import { commands } from './commands.js';

const parseArgsUsername = () => {
  const args = argv.slice(2);
  const usernameArg = args.find((arg) => arg.startsWith('--username='));

  if (!usernameArg) {
    console.error('Please provide --username argument');
    exit(1);
  }

  return usernameArg.split('=')[1];
};

export const config = { currentDir: homedir(), username: parseArgsUsername() };

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

export const closeApp = () => {
  console.log(
    `${EOL}Thank you for using File Manager, ${config.username}, goodbye!`
  );
  process.exit(0);
};

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
