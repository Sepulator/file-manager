import path from 'path';
import { unlink } from 'fs/promises';
import { OPERATION_FAILED, INVALID_INPUT } from '../commands.js';

export const remove = async (data) => {
  if (!data) {
    console.log(INVALID_INPUT);
    return;
  }

  const srcPath = data.replace(/^['"]|['"]$/g, '');

  await unlink(srcPath).catch(() => console.log(OPERATION_FAILED));
};
