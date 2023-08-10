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
      <Show when={result.state === 'ready' && result()} fallback={<Spinner />}>
        {(rslt) => (
          <>
            <Show when={rslt().format === 'latex'}>
              <Maths tex={rslt().output} display />
            </Show>
            <Show when={rslt().format === 'matplotlib'}>
              <img src={rslt().output} alt="Matplotlib plot" />
            </Show>
            <Show when={rslt().format === 'error'}>{rslt().output}</Show>
            <Show when={rslt().format === 'string'}>
              <pre>{rslt().output}</pre>
            </Show>
          </>
        )}
      </Show>
    </div>
  );
}
