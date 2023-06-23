import { EOL, userInfo, homedir, cpus } from 'os';
import { up, cd, list } from './dirUtils.js';

export const OPERATION_FAILED = 'Operation failed';
export const INVALID_INPUT = 'Operation failed';

const CPUS = cpus().map((value) => ({
  model: value.model.trim(),
  speed: `${value.speed} GHz`,
}));
const HOMEDIR = homedir();
const USERNAME = userInfo().username;

export const commands = {
  up: () => up(),
  cd: (dir) => cd(dir),
  ls: () => list(),
  //cat: read,
  //cp: copy,
  //rm: remove,
  //add: create,
  //mv: move,
  //rn: rename,
  //compress: compress,
  //decompress: decompress,
  //hash: calcHash,
  '--EOL': () =>
    console.log(`Default system End-Of-Line: `, JSON.stringify(EOL)),
  '--cpus': () => console.log(`Number of CPUs: ${CPUS.length} \n`, CPUS),
  '--homedir': () => console.log(`Home directory: ${HOMEDIR}`),
  '--username': () => console.log(`Current system user name: ${USERNAME}`),
  '--architecture': () => console.log(`CPU architecture: ${process.arch}`),
};
