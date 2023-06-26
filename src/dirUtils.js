import path from 'path';
import { readdir } from 'fs/promises';

import { OPERATION_FAILED, INVALID_INPUT } from './commands.js';
import { sortBy } from './utils.js';

export const up = () => {
  const currentDir = process.cwd();
  const parentDir = path.resolve(currentDir, '..');
  if (parentDir === currentDir) return;

  process.chdir(parentDir);
};

export const cd = (dir) => {
  if (!dir) {
    console.log(INVALID_INPUT);
    return;
  }

  try {
    const pathWithoutQuotes = dir.replace(/^['"]|['"]$/g, '');
    const filePath = path.normalize(pathWithoutQuotes);
    process.chdir(filePath);
  } catch {
    console.log(OPERATION_FAILED);
  }
};

export const list = async () => {
  const currentDir = process.cwd();

  try {
    const list = await readdir(currentDir, { withFileTypes: true });
    const filesType = list.map((file) => {
      return {
        Name: file.name,
        Type: file.isDirectory()
          ? 'directory'
          : file.isSymbolicLink()
          ? 'symbolic Link'
          : 'file',
      };
    });

    const sortedByType = filesType.concat().sort(sortBy('Type'));

    console.log('\n');
    console.table(sortedByType);
  } catch {
    console.log(OPERATION_FAILED);
  }
};
