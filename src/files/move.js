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

  const fileName = path.basename(args[0].replace(/^['"]|['"]$/g, ''));
  const pathDest = path.join(
    args[1].replace(/^['"]|['"]$/g, ''),
    `${fileName}`
  );

  await pipeline(createReadStream(fileName), createWriteStream(pathDest))
    .then(async () => {
      await unlink(fileName);
    })
    .catch(() => console.log(OPERATION_FAILED));
};
