import { dirname } from 'path';
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

export const commands = {
  up,
};
