import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import path from 'path';

import { OPERATION_FAILED } from './commands.js';

export const compress = async (data) => {
  try {
    const brotliCompress = createBrotliCompress();
    const args = data.split(' ');
    const fileName = path.basename(args[0].replace(/^['"]|['"]$/g, ''));
    const srcPath = path.resolve(fileName);

    const pathDest = args[1]
      ? path.join(args[1].replace(/^['"]|['"]$/g, ''), `${fileName}.br`)
      : path.join(process.cwd(), `${fileName}.br`);

    const readStream = createReadStream(srcPath);
    const writeStream = createWriteStream(pathDest);

    await pipeline(readStream, brotliCompress, writeStream);
  } catch {
    console.log(OPERATION_FAILED);
  }
};

export const decompress = async (data) => {
  try {
    const brotliDeCompress = createBrotliDecompress();
    const args = data.split(' ');
    const fileName = path.basename(args[0].replace(/^['"]|['"]$/g, ''));
    const srcPath = path.resolve(fileName);

    const pathDest = args[1]
      ? path.join(args[1].replace(/^['"]|['"]$/g, ''), `${fileName}`)
      : path.join(process.cwd(), `${fileName.replace(/\.br$/, '')}`);

    const readStream = createReadStream(srcPath);
    const writeStream = createWriteStream(pathDest);

    await pipeline(readStream, brotliDeCompress, writeStream);
  } catch {
    console.log(OPERATION_FAILED);
  }
};
