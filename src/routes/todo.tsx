import meta from './todo.json';
import { faTrash } from '@fortawesome/free-solid-svg-icons/index.js';
import { getTasks, saveTasks } from '~/server/todo';

export interface TodoItem {
  text: string;
  completed: boolean;
}

export function routeData() {
  return createServerData$<TodoItem[]>(getTasks, {
    initialValue: [],
  });
}

export default () => {
  const [, save] = createServerAction$<TodoItem[], void>(saveTasks);
  const data = useRouteData<typeof routeData>();

  const input = (<input style={{ width: '100%' }} placeholder="Task..." />) as HTMLInputElement;
  const [todos, setTodos] = createStore<TodoItem[]>([]);
  createEffect(() => {
    if (data.state === 'ready') {
      setTodos(data());
    }
  });

  const addTodo = (text: string) => {
    setTodos([...todos, { text, completed: false }]);
    save(todos);
  };
  const deleteTodo = (text: string) => {
    const tasks = todos.filter((task) => task.text !== text);
    setTodos(tasks);
    save(tasks);
  };
  const toggleTodo = (text: string) => {
    setTodos(
      (todo) => todo.text === text,
      'completed',
      (completed) => !completed,
    );
    save(todos);
  };
  const submit = () => {
    if (input.value) {
      addTodo(input.value);
    }
    input.value = '';
  };
  return (
    <Page meta={meta}>
      <table class="borderless">
        <tbody>
          <For each={todos}>
            {(todo) => (
              <tr>
                <td class="actions">
                  <button onClick={[deleteTodo, todo.text]}>
                    <Fa icon={faTrash} />
                  </button>
                </td>
                <td>
                  <span
                    style={{
                      'text-decoration': todo.completed ? 'line-through' : 'none',
                      cursor: 'pointer',
                    }}
                    onClick={[toggleTodo, todo.text]}
                  >
                    {todo.text}
                  </span>
                </td>
              </tr>
            )}
          </For>
          <tr>
            <td></td>
            <td>
              <form action="javascript:void(0)" onSubmit={submit}>
                {input}
              </form>
            </td>
          </tr>
        </tbody>
      </table>
    </Page>
  );
};
