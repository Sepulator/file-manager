const DEFAULT_USERNAME = 'Anonymus';
const USERNAME = '--username';

const parseArgs = () => {
  if (process.argv.length === 2) return DEFAULT_USERNAME;

  const args = process.argv.slice(2);
  const pair = args[0].split('=');

  if (pair[0] === USERNAME && pair[1]) {
    return pair[1];
  }

  return DEFAULT_USERNAME;
};

export { parseArgs };
