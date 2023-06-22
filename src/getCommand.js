import { commands } from './commands.js';

export const getCommand = (data) => {
  if (!data) return console.log('Invalid input');

  const args = data.split(' ');
  const command = args[0];
  if (command in commands) {
    const params = data.substring(command.length).trim();
    commands[command](params);
  } else {
    console.log(`Invalid input`);
  }
};
