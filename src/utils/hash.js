import { readFile } from 'fs/promises';
import { createHash } from 'crypto';

import { OPERATION_FAILED } from '../commands.js';

export const calcHash = async (fileName) => {

  if (!data) {
    console.log(INVALID_INPUT);
    return;
  }

  try {
    const fileData = await readFile(fileName, { encoding: 'utf8' });
    const hashObject = createHash('sha256');
    hashObject.update(fileData);
    console.log(hashObject.digest('hex'));
  } catch (err) {
    console.log(OPERATION_FAILED);
  }
};
