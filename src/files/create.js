import { writeFile } from 'fs/promises';
import { OPERATION_FAILED } from '../commands.js';

export const create = async (data) => {
  if (!data) {
    console.log(INVALID_INPUT);
    return;
  }

  const fileName = data.replace(/^['"]|['"]$/g, '');

  await writeFile(fileName, '', { encoding: 'utf8' }).catch(() =>
    console.log(OPERATION_FAILED)
  );
};
