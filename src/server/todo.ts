import type { TodoItem } from '~/routes/todo';
import { readJSONFile, writeJSONFile } from '~/server/utils';

const file = './data/todo.json';

export function getTasks() {
  return readJSONFile(file);
}

export async function saveTasks(tasks: TodoItem[], event: ServerFunctionEvent) {
  writeJSONFile(file, tasks, event);
}
