import { writeFileSync, existsSync, readFileSync } from 'fs';
import { json } from 'solid-start';
import type { APIEvent } from 'solid-start';
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

interface ResponseBody {
  contents: string;
  url: string;
}

export async function POST(event: APIEvent) {
  const body = (await new Response(event.request.body).json()) as ResponseBody;
  const path = fileFromUrl(body.url);
  if (!isLoggedIn(event.request)) {
    throw new Error('You need to be logged in to edit a board.');
  }
  writeFileSync(path, JSON.stringify(body.contents), 'utf-8');
  return json(body.contents);
}
