import { faPlay } from '@fortawesome/free-solid-svg-icons/index.js';

interface JupyterProps {
  children: JSX.Element;
}

export default function Jupyter(props: JupyterProps) {
  const [code, setCode] = createSignal(String(props.children));
  const [codeToRun, setCodeToRun] = createSignal('');
  const [isLoading, setIsLoading] = createSignal<boolean>(false);

  const run = () => {
    setCodeToRun('');
    setIsLoading(true);
    setCodeToRun(code());
  };
  const handleUpdate = (value: string) => {
    setCode(value);
  };
  const handleKeyDown = (event: KeyboardEvent) => {
    setCode((event.target as HTMLTextAreaElement).value);
    if (event.shiftKey && event.code === 'Enter') {
      event.preventDefault();
      run();
    }
  };
  return (
    <>
      <div class="columns">
        <div class="run-button">
          <Show when={!isLoading()}>
            <button class="is-secondary clickable" onClick={run}>
              <Fa icon={faPlay} />
            </button>
          </Show>
          <Show when={isLoading()}>
            <Spinner />
          </Show>
        </div>
        <div class="editor">
          <Editor onUpdate={handleUpdate} onKeyDown={handleKeyDown}>
            {code()}
          </Editor>
        </div>
      </div>
      <Python code={codeToRun()} onExecuted={() => setIsLoading(false)} />
    </>
  );
}
