import type { Stroke } from '~/lib/Whiteboard';
import { readJSONFile, writeJSONFile } from '~/lib/server/utils';

const prefix = './data/';

const fileFromUrl = (url: string) => {
  return prefix + url.replace(/^\/?(.*?)\/?$/, '$1') + '.json';
};

export function loadBoard(key: [string, string, number]) {
  const [, url, slideCount] = key;
  const path = fileFromUrl(url);
  const data = readJSONFile(path, '[]');
  while (data.length < slideCount) {
    data.push([[]]);
  }
  return data;
}

export async function writeBoard(
  data: { url: string; contents: Stroke[][][] },
  event: ServerFunctionEvent,
) {
  writeJSONFile(fileFromUrl(data.url), data.contents, event);
}
