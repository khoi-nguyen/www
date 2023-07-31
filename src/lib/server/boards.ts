import { isLoggedIn } from './auth';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { APIEvent, json } from 'solid-start';
import type { Stroke } from '~/lib/Whiteboard';

const prefix = '~/data/';

const fileFromUrl = (url: string) => {
  return prefix + url.replace(/^\/?(.*?)\/?$/, '$1').replaceAll('/', '--') + '.json';
};

export function loadBoard(url: string) {
  const path = fileFromUrl(url);
  if (!existsSync(path)) {
    return json([]);
  }
  return json(JSON.parse(readFileSync(path, 'utf-8')));
}

export async function writeBoard(url: string, contents: Stroke[][][], event: APIEvent) {
  if (!isLoggedIn(event.request)) {
    throw new Error('You need to be logged in to edit a board.');
  }
  const path = fileFromUrl(url);
  writeFileSync(path, JSON.stringify(contents));
  return json(contents);
}
