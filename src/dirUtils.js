import path from 'path';

export const up = () => {
  const currentDir = process.cwd();
  const parentDir = path.resolve(currentDir, '..');
  if (parentDir === currentDir) return;

  process.chdir(parentDir);
};

export const cd = async (dir) => {
  if (!dir) {
    console.log('Invalid input');
    return;
  }

  try {
    const pathWithoutQuotes = dir.replace(/^['"]|['"]$/g, '');
    const filePath = path.normalize(pathWithoutQuotes);
    process.chdir(filePath);
  } catch {
    console.log('Operation failed');
  }
};
