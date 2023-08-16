import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import * as path from 'path';
import { isAdmin } from '~/lib/server/auth';

function createDirs(file: string) {
  const dirname = path.dirname(file);
  if (!existsSync(dirname)) {
    mkdirSync(dirname, { recursive: true });
  }
}

export function readJSONFile(file: string, defaultValue = '[]') {
  createDirs(file);
  return JSON.parse(existsSync(file) ? readFileSync(file, 'utf-8') : defaultValue);
}

export function writeJSONFile(file: string, contents: any, event: ServerFunctionEvent) {
  createDirs(file);
  if (!isAdmin(undefined, event)) {
    throw new Error('You need to be logged in');
  }
  writeFileSync(file, JSON.stringify(contents), 'utf-8');
}
