import { stdout } from 'process';
import { EOL } from 'os';
import { createReadStream } from 'fs';
import { dirname, resolve } from 'path';
import { stat, readdir } from 'fs/promises';
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

const ls = async () => {
  const items = await readdir(config.currentDir, { withFileTypes: true });

  const sortedItems = items.sort((a, b) => {
    if (a.isDirectory() && !b.isDirectory()) return -1;
    if (!a.isDirectory() && b.isDirectory()) return 1;

    return a.name.localeCompare(b.name);
  });

  const result = sortedItems.map((item) => ({
    Name: item.name,
    Type: item.isDirectory() ? 'directory' : 'file',
  }));

  console.table(result);
};

const cat = async (path) => {
  const filePath = resolve(config.currentDir, path);
  const stats = await stat(filePath);

  if (!stats.isFile()) {
    console.log('Invalid input');
    return;
  }

  const readStream = createReadStream(filePath, { encoding: 'utf8' });
  readStream.pipe(stdout);
  readStream.on('end', () => {
    console.log(`${EOL}`);
    showCurrentPath();
  });
};

export const commands = {
  up,
  cd,
  ls,
  cat,
};
