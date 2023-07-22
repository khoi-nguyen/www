import runPython from '~/lib/pyodide.api';

interface PythonProps {
  code?: string;
  children?: JSX.Element;
  onExecuted?: () => void;
}

export default function Python(props: PythonProps) {
  const [code, setCode] = createSignal<undefined | string>(undefined);
  const [result] = createResource(code, runPython);
  const updateCode = () => {
    setCode(props.children ? String(props.children) : props.code);
  };
  createEffect(() => {
    if (!result.loading && props.onExecuted) {
      props.onExecuted();
    }
  });
  onMount(updateCode);
  createEffect(updateCode);
  return (
    <div class="block">
      <Show when={result.state === 'pending'}>
        <Spinner />
      </Show>
      <Show when={result.state === 'ready'}>
        <Show when={result()!.format === 'latex'}>
          <Maths tex={result()!.output} display />
        </Show>
        <Show when={result()!.format === 'matplotlib'}>
          <img src={result()!.output} alt="Matplotlib plot" />
        </Show>
        <Show when={result()!.format === 'error'}>{result()!.output}</Show>
        <Show when={result()!.format === 'string'}>
          <pre>{result()!.output}</pre>
        </Show>
      </Show>
    </div>
  );
}
