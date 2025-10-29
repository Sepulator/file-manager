import { stat } from 'fs/promises';
import { resolve, basename } from 'path';
import { createReadStream, createWriteStream } from 'fs';

export const fileAction = async (source, destination, action) => {
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
  console.log(
    `✅ File successfully ${action === 'copy' ? 'copied' : 'moved'}.`
  );
};
