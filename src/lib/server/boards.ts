import { isLoggedIn } from './auth';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { APIEvent, json } from 'solid-start';
import type { Stroke } from '~/lib/Whiteboard';

const prefix = '~/data/';

const fileFromUrl = (url: string) => {
  return prefix + url.replace(/^\/?(.*?)\/?$/, '$1').replaceAll('/', '--') + '.json';
};

export function loadBoard(url: string, slideCount: number) {
  const path = fileFromUrl(url);
  const data = JSON.parse(existsSync(path) ? readFileSync(path, 'utf-8') : '[]');
  while (data.length < slideCount) {
    data.push([[]]);
  }
  return json(data);
}

export async function writeBoard(url: string, contents: Stroke[][][], event: APIEvent) {
  if (!isLoggedIn(event.request)) {
    throw new Error('You need to be logged in to edit a board.');
  }
  const path = fileFromUrl(url);
  writeFileSync(path, JSON.stringify(contents));
  return json(contents);
}
