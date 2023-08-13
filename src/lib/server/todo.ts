import { readJSONFile, writeJSONFile } from '~/lib/server/utils';
import type { TodoItem } from '~/routes/todo';

const file = './data/todo.json';

export function getTasks() {
  return readJSONFile(file);
}

export function writeTasks(tasks: TodoItem[], request: Request) {
  writeJSONFile(file, tasks, request);
}
