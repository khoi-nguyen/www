import { writeFileSync, existsSync, readFileSync } from 'fs';
import { json } from 'solid-start';
import type { Stroke } from '~/lib/Whiteboard';
import { isLoggedIn } from '~/lib/server/auth';

const prefix = './src/data/';

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

export function writeBoard(url: string, contents: Stroke[][][], request: Request) {
  const path = fileFromUrl(url);
  if (!isLoggedIn(request)) {
    throw new Error('You need to be logged in to edit a board.');
  }
  writeFileSync(path, JSON.stringify(contents), 'utf-8');
  return json(contents);
}
