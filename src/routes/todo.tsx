import meta from './todo.json';
import { faTrash } from '@fortawesome/free-solid-svg-icons/index.js';
import { useRouteData } from 'solid-start';
import { createServerAction$, createServerData$ } from 'solid-start/server';
import { getTasks, writeTasks } from '~/lib/server/todo';

export interface TodoItem {
  text: string;
  completed: boolean;
}

export function routeData() {
  return createServerData$<TodoItem[]>(
    async () => {
      return await getTasks().json();
    },
    {
      initialValue: [],
    },
  );
}

export default () => {
  const [, saveAction] = createServerAction$(async (data: { tasks: TodoItem[] }, event) => {
    writeTasks(data.tasks, event.request);
  });
  const data = useRouteData<typeof routeData>();

  const input = (<input />) as HTMLInputElement;
  const [todos, setTodos] = createStore<TodoItem[]>([]);
  createEffect(() => {
    if (data.state === 'ready') {
      setTodos(data());
    }
  });

  const addTodo = (text: string) => {
    setTodos([...todos, { text, completed: false }]);
    saveAction({ tasks: todos });
  };
  const deleteTodo = (text: string) => {
    const tasks = todos.filter((task) => task.text !== text);
    setTodos(tasks);
    saveAction({ tasks });
  };
  const toggleTodo = (text: string) => {
    setTodos(
      (todo) => todo.text === text,
      'completed',
      (completed) => !completed,
    );
    saveAction({ tasks: todos });
  };
  const submit = () => {
    addTodo(input.value);
    input.value = '';
  };
  return (
    <Page meta={meta}>
      <For each={todos}>
        {(todo) => (
          <li>
            <input type="checkbox" checked={todo.completed} onchange={[toggleTodo, todo.text]} />{' '}
            <span style={{ 'text-decoration': todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.text)}>
              <Fa icon={faTrash} />
            </button>
          </li>
        )}
      </For>
      {input}
      <input type="submit" onClick={submit} />
    </Page>
  );
};
