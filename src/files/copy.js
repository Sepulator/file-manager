import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { OPERATION_FAILED, INVALID_INPUT } from '../commands.js';

export const copy = async (data) => {
  const args = data.split(' ');

  if (args.length !== 2) {
    console.log(INVALID_INPUT);
    return;
  }

  const fileName = path.basename(args[0].replace(/^['"]|['"]$/g, ''));
  const srcPath = path.resolve(fileName);
  const destPath = path.join(
    args[1].replace(/^['"]|['"]$/g, ''),
    `${fileName}`
  );

  try {
    const readStream = createReadStream(srcPath);
    const writeStream = createWriteStream(destPath);
    await pipeline(srcPath, destPath);
  } catch {
    console.log(OPERATION_FAILED);
  }
};
