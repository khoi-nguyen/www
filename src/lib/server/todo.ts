import { ServerFunctionEvent } from 'solid-start';
import { readJSONFile, writeJSONFile } from '~/lib/server/utils';
import type { TodoItem } from '~/routes/todo';

const file = './data/todo.json';

export function getTasks() {
  return readJSONFile(file).json();
}

export async function saveTasks(tasks: TodoItem[], event: ServerFunctionEvent) {
  writeJSONFile(file, tasks, event.request);
}
