import { resolve, basename, format } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';

export const compressAction = async (source, destination, action) => {
  if (!source || !destination) {
    console.log('⚠️ Invalid input. Source and destination are required.');
    return;
  }

  const sourcePath = resolve(config.currentDir, source);
  const filename = basename(sourcePath);
  const destinationDirPath = resolve(config.currentDir, destination);

  const destinationPath = format({
    dir: destinationDirPath,
    name: action === 'compress' ? filename : filename.replace(/\.br$/, ''),
    ext: action === 'compress' ? '.br' : '',
  });

  const readableStream = createReadStream(sourcePath);
  const writableStream = createWriteStream(destinationPath);
  const brotli =
    action === 'compress' ? createBrotliCompress() : createBrotliDecompress();

  await pipeline(readableStream, brotli, writableStream);
  console.log(
    `✅ File ${
      action === 'compress' ? 'compressed' : 'decompressed'
    } successfully!`
  );
};
