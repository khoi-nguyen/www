import { isEqual } from 'lodash-es'
import type { Stroke } from '~/lib/Whiteboard'
import { readJSONFile, writeJSONFile } from '~/server/utils'

const prefix = './data/'

const fileFromUrl = (url: string) => {
  return prefix + url.replace(/^\/?(.*?)\/?$/, '$1') + '.json'
}

export function loadBoard(key: [string, string, number]) {
  const [, url, slideCount] = key
  const path = fileFromUrl(url)
  const data = readJSONFile(path, '[]')
  while (data.length < slideCount) {
    data.push([[]])
  }
  return data
}

export async function writeBoard(
  data: { url: string; contents: Stroke[][][]; forceWrite?: boolean },
  event: ServerFunctionEvent,
) {
  const stored = readJSONFile(fileFromUrl(data.url))
  let changes = 0
  for (let i = 0; i < stored.length; i++) {
    if (!isEqual(stored[i], data.contents[i])) {
      changes++
    }
  }
  if (changes <= 1 || data.forceWrite) {
    await writeJSONFile(fileFromUrl(data.url), data.contents, event)
  } else {
    throw new Error('Your version of the boards seem too old. Try refreshing the page.')
  }
}
