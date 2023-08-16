import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import * as path from 'path';
import { json, ServerFunctionEvent } from 'solid-start';
import { isAdmin } from '~/lib/server/auth';

function createDirs(file: string) {
  const dirname = path.dirname(file);
  if (!existsSync(dirname)) {
    mkdirSync(dirname, { recursive: true });
  }
}

export function readJSONFile(file: string, defaultValue = '[]', returnJson = true) {
  createDirs(file);
  const data = JSON.parse(existsSync(file) ? readFileSync(file, 'utf-8') : defaultValue);
  if (returnJson) {
    return json(data);
  } else {
    return data;
  }
}

export function writeJSONFile(file: string, contents: any, request: Request) {
  createDirs(file);
  if (!isAdmin(undefined, { request } as ServerFunctionEvent)) {
    throw new Error('You need to be logged in');
  }
  writeFileSync(file, JSON.stringify(contents), 'utf-8');
}
