import meta from './todo.json';

interface TodoItem {
  text: string;
  completed: boolean;
}

export default () => {
  const input = (<input />) as HTMLInputElement;
  const [todos, setTodos] = createStore<TodoItem[]>([]);
  const addTodo = (text: string) => {
    setTodos([...todos, { text, completed: false }]);
  };
  const toggleTodo = (text: string) => {
    setTodos(
      (todo) => todo.text === text,
      'completed',
      (completed) => !completed,
    );
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
          </li>
        )}
      </For>
      {input}
      <input type="submit" onClick={submit} />
    </Page>
  );
};
