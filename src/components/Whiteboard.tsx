import Whiteboard from '~/lib/Whiteboard';
import type { Stroke } from '~/lib/Whiteboard';

interface WhiteboardProps {
  container: HTMLElement;
  height: number;
  strokes: Stroke[];
  state: 'unsaved' | 'saving' | 'saved';
  onBoardChange?: () => any;
  width: number;
}

export default (props: WhiteboardProps) => {
  const canvas = (<canvas width={props.width} height={props.height} />) as HTMLCanvasElement;
  const whiteboard = new Whiteboard(props.container, canvas, props.strokes);
  onMount(() => {
    whiteboard.init();
    if (props.onBoardChange) {
      whiteboard.canvas.addEventListener('boardChange', props.onBoardChange);
    }
  });

  createEffect(() => {
    whiteboard.strokes = props.strokes;
    whiteboard.redraw();
  });

  return (
    <>
      {canvas}
      <Toolbar whiteboard={whiteboard} state={props.state} />
    </>
  );
};
