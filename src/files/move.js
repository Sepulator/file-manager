import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { unlink } from 'fs/promises';
import { OPERATION_FAILED, INVALID_INPUT } from '../commands.js';

export const move = async (data) => {
  const args = data.split(' ');

  if (args.length !== 2) {
    console.log(INVALID_INPUT);
    return;
  }

  const fileName = path.basename(args[0].replace(/^['"]|['"]$/g, ''));
  const srcPath = path.resolve(fileName);

  const pathDest = args[1]
    ? path.join(args[1].replace(/^['"]|['"]$/g, ''), `${fileName}.br`)
    : path.join(process.cwd(), `${fileName}.br`);

  try {
    const readStream = createReadStream(srcPath);
    const writeStream = createWriteStream(pathDest);
    readStream.pipe(writeStream);

    readStream.on('end', async () => {
      await unlink(srcPath);
    });
  } catch {
    console.log(OPERATION_FAILED);
  }
};
