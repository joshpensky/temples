import fs from 'fs';
import path from 'path';

/**
 * Read file from given path.
 */
export const readFile = (path: string): string => {
  return fs.readFileSync(path, 'utf-8');
};

/**
 * Write file to given path.
 */
export const writeFile = (filePath: string, content: string): void => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
};

/**
 * Resolve path joined by base and relative paths
 */
export const resolvePaths = (base = '', relative = ''): string => {
  return path.resolve(path.join(base, relative));
};
