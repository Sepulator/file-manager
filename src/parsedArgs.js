import { argv, exit } from 'process';

export const parseArgsUsername = () => {
  const args = argv.slice(2);
  const usernameArg = args.find((arg) => arg.startsWith('--username='));

  if (!usernameArg) {
    console.error('Please provide --username argument');
    exit(1);
  }

  return usernameArg.split('=')[1];
};
