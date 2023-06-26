import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createBrotliDecompress } from 'zlib';
import path from 'path';

import { OPERATION_FAILED, INVALID_INPUT } from '../commands.js';

export const decompress = async (data) => {
  const args = data.split(' ');

  if (args.length !== 2) {
    console.log(INVALID_INPUT);
    return;
  }

  const brotliDeCompress = createBrotliDecompress();
  const srcPath = path.resolve(args[0].replace(/^['"]|['"]$/g, ''));
  const fileName = path.basename(srcPath);
  const pathDest = path.join(args[1].replace(/^['"]|['"]$/g, ''), `${fileName.replace(/\.br$/, '')}`);

  await pipeline(
    createReadStream(srcPath),
    brotliDeCompress,
    createWriteStream(pathDest)
  ).catch(() => console.log(OPERATION_FAILED));
};
