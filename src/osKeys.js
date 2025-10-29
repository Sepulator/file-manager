import { EOL, cpus, userInfo, arch } from 'os';

import { config } from './config.js';

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
