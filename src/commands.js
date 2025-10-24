import { dirname, resolve } from 'path';
import { stat } from 'fs/promises';
import { config, isRootDirectory, showCurrentPath } from './utils.js';

const up = async () => {
  const parent = dirname(config.currentDir);
  const isRoot = isRootDirectory(config.currentDir);

  if (isRoot) {
    return;
  }

  await stat(parent);

  config.currentDir = parent;
};

const cd = async (path) => {
  if (!path) {
    return;
  }

  const newPath = resolve(config.currentDir, path);
  const stats = await stat(newPath);

  if (!stats.isDirectory()) {
    console.log('Invalid input');
    return;
  }

  config.currentDir = newPath;
};

export const commands = {
  up,
  cd,
};
