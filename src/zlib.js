import { pipeline } from 'stream/promises';
import { brotliCompress } from 'zlib';

export const compress = (data) => {
  const brotliCompress = brotliCompress();
};

export const decompress = (fileName) => {};
