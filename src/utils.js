import { dirname } from 'path';
import { homedir, platform, EOL, cpus, userInfo, arch } from 'os';

import { commands } from './commands.js';
import { config } from './const.js';

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

const getCPUs = () => {
  console.log(`  Number of CPUs: ${cpus().length}`);
  console.log(`  Model: ${cpus()[0].model}`);
  console.log('  Cores:');

  cpus().forEach((core, index) => {
    console.log(
      `    Core ${index + 1}: @ ${(core.speed / 1000).toFixed(2)}GHz`
    );
  });
};

export const osKeys = {
  '--EOL': () => console.log(`  EOL: ${JSON.stringify(EOL)}`),
  '--cpus': getCPUs,
  '--homedir': () => console.log(`  Home directory: ${config.currentDir}`),
  '--username': () => console.log(`  Current user: ${userInfo().username}`),
  '--architecture': () => console.log(`  CPU Architecture: ${arch()}`),
};
