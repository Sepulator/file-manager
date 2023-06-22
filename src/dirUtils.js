import path from 'path';
import { fileURLToPath } from 'url';

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

  let targetPath = dir.trim();
  if (!path.isAbsolute(dir)) {
    const __dirname = process.cwd();
    targetPath = path.join(__dirname, targetPath);
  }

  try {
    process.chdir(targetPath);
  } catch {
    console.log('Operation failed');
  }
};
