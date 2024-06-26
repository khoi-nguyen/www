import type { CodeJar } from 'codejar'
import Prism from 'prismjs'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-tsx'
import 'prismjs/themes/prism-coy.css'
import 'prism-svelte'

interface EditorProps {
  children?: JSX.Element
  code?: string
  lang?: keyof typeof Prism.languages
  onUpdate?: (code: string) => void
  onKeyDown?: (event: KeyboardEvent) => void
  hideUntil?: Date
  readOnly?: boolean

  /** A solution or a solve function */
  solution?: string | ((solve: boolean) => string)
}

export default function Editor(props: EditorProps) {
  props = mergeProps({ lang: 'python' }, props)
  const textArea = (<code />) as HTMLElement
  let editor: CodeJar
  const code = () => {
    if (props.code) {
      return props.code
    } else if (props.children) {
      return String(props.children)
    } else if (typeof props.solution === 'function') {
      return props.solution(false)
    } else {
      return ''
    }
  }

  const [ready, setReady] = createSignal(false)
  onMount(async () => {
    const CodeJar = await import('codejar')
    const highlight = (element: HTMLElement) => Prism.highlightElement(element)
    editor = CodeJar.CodeJar(textArea, highlight, { tab: '\t', addClosing: false })
    setReady(true)
    editor.updateCode(code())
    textArea.style.whiteSpace = 'pre'

    editor.onUpdate((code: string) => {
      if (props.onUpdate) {
        props.onUpdate(code)
      }
    })

    textArea.onkeydown = (event: KeyboardEvent) => {
      if (props.onKeyDown) {
        props.onKeyDown(event)
      }
    }
  })

  createEffect(() => {
    if (ready() && editor) {
      editor.updateCode(props.code || String(props.children || ''))
    }
  })

  onCleanup(() => {
    if (editor) {
      editor.destroy()
    }
  })

  const [admin] = useSession()
  const solve = () => {
    if (props.solution) {
      if (typeof props.solution === 'function') {
        editor.updateCode(props.solution(true))
      } else {
        editor.updateCode(props.solution)
      }
    }
  }

  const showSolutionButton = () => {
    if (!props.solution) {
      return false
    }
    if (!props.hideUntil) {
      return true
    }
    return new Date() > props.hideUntil || admin()
  }

  const classes = () => {
    const classList = [`language-${props.lang}`]
    if (!props.readOnly) {
      classList.push('clickable')
    }
    return classList.join(' ')
  }

  return (
    <>
      <pre class={classes()}>{textArea}</pre>
      <Show when={showSolutionButton()}>
        <Button onClick={solve}>Solve</Button>
      </Show>
    </>
  )
}
