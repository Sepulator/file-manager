import { stdout } from 'process';
import { EOL } from 'os';
import { dirname, resolve, basename } from 'path';
import { stat, readdir, rename, mkdir as makeDir, unlink } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

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
    console.log('⚠️ Invalid input. The specified path is not a directory.');
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
    console.log('⚠️ Invalid input. The specified path is not a file.');
    return;
  }

  const readStream = createReadStream(filePath, { encoding: 'utf8' });
  readStream.pipe(stdout);
  readStream.on('end', () => {
    console.log(`${EOL}`);
    showCurrentPath();
  });
};

const add = async (fileName) => {
  if (!fileName) {
    console.log('⚠️ Invalid input. File name is required.');
    return;
  }

  const filePath = resolve(config.currentDir, fileName);
  const writeStream = createWriteStream(filePath, { flags: 'wx' });
  writeStream.end();
  console.log(`✅ File created ${filePath}`);
};

const rn = async (oldFileName, newFileName) => {
  if (!oldFileName || !newFileName) {
    console.log('⚠️ Invalid input. Both old and new file names are required.');
    return;
  }

  const oldFilePath = resolve(config.currentDir, oldFileName);
  const newFilePath = resolve(config.currentDir, newFileName);

  await stat(oldFilePath);
  await rename(oldFilePath, newFilePath);
  console.log(`✅ File renamed to ${newFilePath}`);
};

const mkdir = async (dirName) => {
  if (!dirName) {
    console.log('⚠️ Invalid input. Directory name is required.');
    return;
  }

  const dirPath = resolve(config.currentDir, dirName);
  await makeDir(dirPath);
  console.log(`✅ Directory created ${dirPath}`);
};

const fileAction = async (source, destination) => {
  if (!source || !destination) {
    console.log('⚠️ Invalid input. Source and destination are required.');
    return;
  }

  const sourcePath = resolve(config.currentDir, source);
  const destinationDirPath = resolve(config.currentDir, destination);
  const filename = basename(sourcePath);
  const destPath = resolve(destinationDirPath, filename);

  await stat(sourcePath);
  await stat(destinationDirPath);

  const readStream = createReadStream(sourcePath);
  const writeStream = createWriteStream(destPath);

  await pipeline(readStream, writeStream);
};

const cp = async (source, destination) => {
  await fileAction(source, destination);
  console.log(`✅ File copied to ${destination}`);
};

const mv = async (source, destination) => {
  await fileAction(source, destination);
  await unlink(source);
  console.log(`✅ File moved to ${destination}`);
};

export const commands = {
  rn,
  up,
  cd,
  ls,
  cp,
  mv,
  add,
  cat,
  mkdir,
};
