import { faPlay } from '@fortawesome/free-solid-svg-icons/index.js';

interface JupyterProps {
  children: JSX.Element;
  before?: string;
  hideUntil?: Date;
  run?: boolean;
  solution?: string;
}

export default function Jupyter(props: JupyterProps) {
  const [code, setCode] = createSignal(
    Array.isArray(props.children) ? props.children.join('\n') : String(props.children),
  );
  const [codeToRun, setCodeToRun] = createSignal('');
  const [isLoading, setIsLoading] = createSignal<boolean>(false);

  onMount(() => {
    if (props.run && code()) {
      run();
    }
  });

  const run = () => {
    setCodeToRun('');
    setIsLoading(true);
    setCodeToRun((props.before || '') + '\n' + code());
  };
  const handleKeyDown = (event: KeyboardEvent) => {
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
          <Editor
            onUpdate={setCode}
            onKeyDown={handleKeyDown}
            solution={props.solution}
            hideUntil={props.hideUntil}
          >
            {code()}
          </Editor>
        </div>
      </div>
      <Python code={codeToRun()} onExecuted={() => setIsLoading(false)} />
    </>
  );
}
