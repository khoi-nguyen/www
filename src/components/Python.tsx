import runPython from '~/lib/pyodide.api';

interface PythonProps {
  code?: string;
  children?: JSX.Element;
  onExecuted?: () => void;
}

export default function Python(props: PythonProps) {
  const [mounted, setMounted] = createSignal(false);
  onMount(() => {
    setMounted(true);
  });

  const code = () => {
    if (!mounted()) {
      return undefined;
    }
    return props.children ? String(props.children) : props.code;
  };

  const [result] = createResource(code, runPython);
  createEffect(() => {
    if (!result.loading && props.onExecuted) {
      props.onExecuted();
    }
  });
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
