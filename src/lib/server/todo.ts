import { existsSync, readFileSync, writeFileSync } from 'fs';
import { json } from 'solid-start';
import { isLoggedIn } from '~/lib/server/auth';
import type { TodoItem } from '~/routes/todo';

const file = './data/todo.json';

export function getTasks() {
  const data = JSON.parse(existsSync(file) ? readFileSync(file, 'utf-8') : '[]');
  return json(data as TodoItem[]);
}

export function writeTasks(tasks: TodoItem[], request: Request) {
  if (!isLoggedIn(request)) {
    throw new Error('You need to be logged in to save a task');
  }
  writeFileSync(file, JSON.stringify(tasks), 'utf-8');
}
