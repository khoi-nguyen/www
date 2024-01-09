import { faPlay } from '@fortawesome/free-solid-svg-icons/index.js'

export interface JupyterProps {
  children?: JSX.Element

  /** Show results in an adjacent column if true */
  columns?: boolean

  /** Will be appended to the executed code but will not be shown */
  after?: string

  /** Will be prepended to the executed code but will not be shown */
  before?: string

  /** If set, will hide the 'solve' button until a certain date */
  hideUntil?: Date

  /** Input language */
  lang?: 'python' | 'react' | 'html' | 'svelte'

  modules: { [name: string]: string }

  /** Whether to run the code on mount */
  run?: boolean

  /** Add a 'solve' button which changes the code to the solution */
  solution?: string | ((solve: boolean) => string)

  /** Only transpile the code, don't run it */
  transpileOnly?: boolean
}

function getInitialValue(props: JupyterProps) {
  if (typeof props.solution === 'function') {
    return props.solution(false)
  }
  return Array.isArray(props.children) ? props.children.join('\n') : String(props.children)
}

export default function Jupyter(props: JupyterProps) {
  props = mergeProps({ lang: 'python' as const }, props)
  const editorLang = () => (props.lang === 'react' ? 'tsx' : props.lang)
  const initial = getInitialValue(props)
  const [code, setCode] = createSignal(initial)
  const [codeToRun, setCodeToRun] = createSignal('')
  const [isLoading, setIsLoading] = createSignal<boolean>(false)

  onMount(() => {
    if (props.run && code()) {
      run()
    }
  })

  const run = () => {
    setCodeToRun('')
    setIsLoading(true)
    setCodeToRun((props.before || '') + '\n' + code() + (props.after ? '\n' + props.after : ''))
  }
  const handleKeyDown = (event: KeyboardEvent) => {
    if ((event.shiftKey || event.ctrlKey) && event.code === 'Enter') {
      event.preventDefault()
      run()
    }
  }
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
            {initial}
          </Editor>
        </div>
      </div>
      <div>
        <Show when={props.lang === 'python'}>
          <Python code={codeToRun()} onExecuted={() => setIsLoading(false)} />
        </Show>
        <Show when={props.lang === 'svelte'}>
          <Javascript
            code={codeToRun()}
            onExecuted={() => setIsLoading(false)}
            mode="svelte"
            modules={props.modules || {}}
          />
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
  )
}
