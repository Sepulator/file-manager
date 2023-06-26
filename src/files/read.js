import path from 'path';
import { createReadStream } from 'fs';
import { OPERATION_FAILED, INVALID_INPUT } from '../commands.js';

export const read = async (data) => {
  const args = data.split(' ');

  if (args.length !== 1) {
    console.log(INVALID_INPUT);
    return;
  }

  try {
    const fileName = path.basename(args[0].replace(/^['"]|['"]$/g, ''));
    const readStream = createReadStream(fileName);
    readStream.on('data', (chunk) => {
      console.log(chunk.toString());
    });

    readStream.on('error', () => {
      console.log(OPERATION_FAILED);
    });
  } catch {
    console.log(OPERATION_FAILED);
  }
};
