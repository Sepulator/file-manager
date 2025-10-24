import { homedir } from 'os';
import { argv, exit } from 'process';

const parseArgsUsername = () => {
  const args = argv.slice(2);
  const usernameArg = args.find((arg) => arg.startsWith('--username='));

  if (!usernameArg) {
    console.error('Please provide --username argument');
    exit(1);
  }

  return usernameArg.split('=')[1];
};

export const username = parseArgsUsername();
export const currentDir = homedir();
