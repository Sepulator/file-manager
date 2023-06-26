import path from 'path';
import { rename as renameFs } from 'fs/promises';
import { OPERATION_FAILED, INVALID_INPUT } from '../commands.js';

export const rename = async (data) => {
  const args = data.split(' ');

  if (args.length !== 2) {
    console.log(INVALID_INPUT);
    return;
  }

  const srcPath = args[0].replace(/^['"]|['"]$/g, '');
  const fileName = args[1].replace(/^['"]|['"]$/g, '');
  const dirName = path.dirname(srcPath);
  const destPath = path.join(dirName, fileName);

  try {
    await renameFs(srcPath, destPath);
  } catch {
    console.log(OPERATION_FAILED);
  }
};
