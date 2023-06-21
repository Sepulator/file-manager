import { commands } from './commands.js';

export const getCommand = (data) => {
  if (!data) return console.log('Command line is empty');
  const args = data.split(' ');
  const param = args[0];
  if (param in commands && param.startsWith('--')) {
    commands[param]();
  } else {
    console.log(`Unknown command: ${param.slice(5)}`);
  }
};
