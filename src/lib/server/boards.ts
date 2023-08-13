import { json } from 'solid-start';
import type { Stroke } from '~/lib/Whiteboard';
import { readJSONFile, writeJSONFile } from '~/lib/server/utils';

const prefix = './data/';

const fileFromUrl = (url: string) => {
  return prefix + url.replace(/^\/?(.*?)\/?$/, '$1') + '.json';
};

export function loadBoard(url: string, slideCount: number) {
  const path = fileFromUrl(url);
  const data = readJSONFile(path, '[]', false);
  while (data.length < slideCount) {
    data.push([[]]);
  }
  return json(data);
}

export function writeBoard(url: string, contents: Stroke[][][], request: Request) {
  const boardFile = fileFromUrl(url);
  writeJSONFile(boardFile, contents, request);
}
