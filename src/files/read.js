import { createReadStream } from 'fs';
import { OPERATION_FAILED, INVALID_INPUT } from '../commands.js';

export const read = async (data) => {
  if (!data) {
    console.log(INVALID_INPUT);
    return;
  }

  const fileName = data.replace(/^['"]|['"]$/g, '');

  const stream = () => {
    return new Promise((resolve, reject) => {
      const readStream = createReadStream(fileName);

      readStream.on('data', (chunk) => {
        process.stdout.write(chunk);
      });
      readStream.on('error', () => {
        reject(OPERATION_FAILED);
      });
      readStream.on('end', () => {
        resolve();
      });
    });
  };

  await stream();
};
