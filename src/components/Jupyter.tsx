import { faPlay } from '@fortawesome/free-solid-svg-icons/index.js';

interface JupyterProps {
  children: JSX.Element;
  columns: boolean;
  before?: string;
  hideUntil?: Date;
  lang?: 'python' | 'react';
  run?: boolean;
  solution?: string;
}

export default function Jupyter(props: JupyterProps) {
  props = mergeProps({ lang: 'python' as const }, props);
  const editorLang = () => (props.lang === 'react' ? 'tsx' : props.lang);
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
    <div classList={{ columns: props.columns }}>
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
            lang={editorLang()}
            onUpdate={setCode}
            onKeyDown={handleKeyDown}
            solution={props.solution}
            hideUntil={props.hideUntil}
          >
            {code()}
          </Editor>
        </div>
      </div>
      <div>
        <Show when={props.lang === 'python'}>
          <Python code={codeToRun()} onExecuted={() => setIsLoading(false)} />
        </Show>
        <Show when={props.lang === 'react'}>
          <Javascript code={codeToRun()} onExecuted={() => setIsLoading(false)} react />
        </Show>
      </div>
    </div>
  );
}
