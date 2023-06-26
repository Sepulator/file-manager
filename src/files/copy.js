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

  const srcPath = args[0].replace(/^['"]|['"]$/g, '');
  const fileName = path.basename(srcPath);
  const destPath = path.join(
    args[1].replace(/^['"]|['"]$/g, ''),
    `${fileName}`
  );

  await pipeline(
    createReadStream(srcPath),
    createWriteStream(destPath)
  ).catch(() => console.log(OPERATION_FAILED));
};
