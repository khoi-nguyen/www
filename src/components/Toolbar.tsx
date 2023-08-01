import { faFolderOpen } from '@fortawesome/free-solid-svg-icons/index.js';
import {
  faBlackboard,
  faPen,
  faHighlighter,
  faSave,
} from '@fortawesome/free-solid-svg-icons/index.js';
import type Whiteboard from '~/lib/Whiteboard';

interface ToolbarProps {
  save: () => void;
  whiteboard: Whiteboard;
}

type Brush = [string, number];

const brushes: Brush[] = [
  ['#255994', 2],
  ['darkred', 2],
  ['green', 2],
  ['black', 2],
  ['rgba(241, 231, 64, 0.4)', 30],
  ['rgba(93, 226, 60, 0.4)', 30],
  ['rgba(243, 149, 57, 0.4)', 30],
  ['rgba(233, 79, 88, 0.4)', 30],
];

export default function Toolbar(props: ToolbarProps) {
  const [color, setColor] = createSignal<string>(brushes[0][0]);
  const [lineWidth, setLineWidth] = createSignal<number>(brushes[0][1]);
  const changeBrush = (brush: Brush) => {
    setColor(brush[0]);
    setLineWidth(brush[1]);
    props.whiteboard.changeBrush(...brush);
  };
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
        <Fa icon={faBlackboard} />
      </button>
      <button class="is-secondary" onClick={props.save}>
        <Fa icon={faSave} />
      </button>
    </div>
  );
}
