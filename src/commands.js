import { EOL, userInfo, homedir, cpus } from 'os';

import { up, cd, list } from './dir/dir-utils.js';
import { create } from './files/create.js';
import { calcHash } from './utils/hash.js';
import { compress } from './zip/compress.js';
import { decompress } from './zip/decompress.js';
import { rename } from './files/rename.js';
import { remove } from './files/remove.js';
import { move } from './files/move.js';
import { copy } from './files/copy.js';
import { read } from './files/read.js';

export const OPERATION_FAILED = 'Operation failed';
export const INVALID_INPUT = 'Invalid input';

const CPUS = cpus().map((value) => ({
  model: value.model.trim(),
  speed: `${value.speed} GHz`,
}));
const HOMEDIR = homedir();
const USERNAME = userInfo().username;

export const commands = {
  up: up,
  cd: cd,
  ls: list,
  cat: read,
  cp: copy,
  rm: remove,
  add: create,
  mv: move,
  rn: rename,
  compress: compress,
  decompress: decompress,
  hash: calcHash,
  '--EOL': () =>
    console.log(`Default system End-Of-Line: `, JSON.stringify(EOL)),
  '--cpus': () => console.log(`Number of CPUs: ${CPUS.length} \n`, CPUS),
  '--homedir': () => console.log(`Home directory: ${HOMEDIR}`),
  '--username': () => console.log(`Current system user name: ${USERNAME}`),
  '--architecture': () => console.log(`CPU architecture: ${process.arch}`),
};
