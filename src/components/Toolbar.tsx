import { faPython } from '@fortawesome/free-brands-svg-icons'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons/index.js'
import {
  faBroom,
  faFloppyDisk,
  faLock,
  faPen,
  faHighlighter,
} from '@fortawesome/free-solid-svg-icons/index.js'
import type Whiteboard from '~/lib/Whiteboard'

interface ToolbarProps {
  whiteboard: Whiteboard
}

type Brush = [string, number]

const brushes: Brush[] = [
  ['#255994', 2],
  ['darkred', 2],
  ['green', 2],
  ['darkorange', 2],
  ['gray', 2],
  ['black', 2],
  ['rgba(241, 231, 64, 0.4)', 30],
  ['rgba(93, 226, 60, 0.4)', 30],
  ['rgba(243, 149, 57, 0.4)', 30],
  ['rgba(233, 79, 88, 0.4)', 30],
]

export default function Toolbar(props: ToolbarProps) {
  const [admin, { PasswordField, Form }] = useSession()
  const [color, setColor] = createSignal<string>(brushes[0][0])
  const [lineWidth, setLineWidth] = createSignal<number>(brushes[0][1])
  const changeBrush = (brush: Brush) => {
    setColor(brush[0])
    setLineWidth(brush[1])
    props.whiteboard.changeBrush(...brush)
  }
  const context = useBoards()

  const [showPythonRepl, setShowPythonRepl] = createSignal(false)
  const togglePythonRepl = () => {
    setShowPythonRepl(!showPythonRepl())
  }

  const [showLoginForm, setShowLoginForm] = createSignal<boolean>(false)

  return (
    <div class="toolbar">
      <A href="../" class="active">
        <Fa icon={faFolderOpen} />
      </A>
      <For each={brushes}>
        {(brush) => (
          <button
            classList={{ 'is-secondary': color() !== brush[0] || lineWidth() !== brush[1] }}
            onClick={() => changeBrush(brush)}
            style={{ color: brush[0] }}
          >
            <Fa icon={brush[1] > 5 ? faHighlighter : faPen} />
          </button>
        )}
      </For>
      <button class="is-secondary" onClick={() => props.whiteboard.clearBoard(true)}>
        <Fa icon={faBroom} />
      </button>
      <div class="python-repl" style={{ display: showPythonRepl() ? 'block' : 'none' }}>
        <Jupyter lang="python">
          {dedent`
            from sympy import *
            x, y, z, t = symbols("x y z t")
          `}
        </Jupyter>
      </div>
      <button class="is-secondary" onClick={togglePythonRepl}>
        <Fa icon={faPython} />
      </button>
      <Show when={admin()}>
        <Show when={context.state() === 'saving'}>
          <Spinner inline />
        </Show>
        <Show when={context.state() === 'unsaved'}>
          <Fa icon={faFloppyDisk} />
        </Show>
      </Show>
      <Show when={!showLoginForm() && !admin()}>
        <button class="is-secondary" onClick={() => setShowLoginForm(true)}>
          <Fa icon={faLock} />
        </button>
      </Show>
      <Show when={!admin() && showLoginForm()}>
        <Form>
          <label for="password">Password: </label>
          <PasswordField />
          <input type="submit" />
        </Form>
      </Show>
    </div>
  )
}
