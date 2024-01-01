import { faPlay } from '@fortawesome/free-solid-svg-icons/index.js';

interface JupyterProps {
  children: JSX.Element;

  /** Show results in an adjacent column if true */
  columns?: boolean;

  /** Will be prepended to the executed code but will not be shown */
  before?: string;

  /** If set, will hide the 'solve' button until a certain date */
  hideUntil?: Date;

  /** Input language */
  lang?: 'python' | 'react' | 'html' | 'svelte';

  /** Whether to run the code on mount */
  run?: boolean;

  /** Add a 'solve' button which changes the code to the solution */
  solution?: string;

  /** Only transpile the code, don't run it */
  transpileOnly?: boolean;
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
    if ((event.shiftKey || event.ctrlKey) && event.code === 'Enter') {
      event.preventDefault();
      run();
    }
  };
  return (
    <div classList={{ columns: props.columns, block: true }}>
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
        <Show when={props.lang === 'svelte'}>
          <Javascript code={codeToRun()} onExecuted={() => setIsLoading(false)} mode="svelte" />
        </Show>
        <Show when={props.lang === 'react' && !props.transpileOnly}>
          <Javascript code={codeToRun()} onExecuted={() => setIsLoading(false)} mode="react" />
        </Show>
        <Show when={props.lang === 'react' && props.transpileOnly}>
          <Transpile code={codeToRun()} onChange={() => setIsLoading(false)} />
        </Show>
        <Show when={props.lang === 'html'}>
          <Html code={codeToRun()} onExecuted={() => setIsLoading(false)} />
        </Show>
      </div>
    </div>
  );
}
