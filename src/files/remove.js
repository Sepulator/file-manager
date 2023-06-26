import path from 'path';
import { unlink } from 'fs/promises';
import { OPERATION_FAILED, INVALID_INPUT } from '../commands.js';

export const remove = async (data) => {
  const args = data.split(' ');

  if (args.length !== 1) {
    console.log(INVALID_INPUT);
    return;
  }

  const srcPath = args[0].replace(/^['"]|['"]$/g, '');

  try {
    await unlink(srcPath);
  } catch {
    console.log(OPERATION_FAILED);
  }
};
