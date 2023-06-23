import path from 'path';
import { readdir, stat } from 'fs/promises';

import { OPERATION_FAILED, INVALID_INPUT } from './commands.js';

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
    const files = await readdir(currentDir, { withFileTypes: true });
    console.table(
      files.map((file) => {

        return {
          Name: file.name,
          Type: file.isDirectory() ? 'directory' : 'file',
        };
      })
    );
  } catch {
    console.log(OPERATION_FAILED);
  }
};
