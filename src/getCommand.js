import { commands } from './commands.js';

export const getCommand = (data) => {
  if (!data) return console.log('Invalid input');

  const args = data.split(' ');
  const command = args[0];
  const params = args[1];

  if (command in commands) {
    commands[command](params);
  } else {
    console.log(`Invalid input`);
  }
};
