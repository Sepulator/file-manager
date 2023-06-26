import path from 'path';
import { pipeline } from 'stream/promises';
import { unlink } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';

import { OPERATION_FAILED, INVALID_INPUT } from '../commands.js';

export const move = async (data) => {
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

  await pipeline(createReadStream(srcPath), createWriteStream(destPath))
    .then(async () => await unlink(srcPath))
    .catch(() => console.log(OPERATION_FAILED));
};
