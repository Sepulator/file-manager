import { writeFile } from 'fs/promises';
import { OPERATION_FAILED } from '../commands.js';

export const create = async (fileName) => {
  try {
    await writeFile(fileName, '', { encoding: 'utf8' });
  } catch (err) {
    console.log(OPERATION_FAILED);
  }
};
