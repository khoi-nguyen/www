import Whiteboard from '~/lib/Whiteboard';
import type { Stroke } from '~/lib/Whiteboard';

interface WhiteboardProps {
  container: HTMLElement;
  height: number;
  save: () => void;
  strokes: Stroke[];
  width: number;
}

export default (props: WhiteboardProps) => {
  const canvas = (<canvas width={props.width} height={props.height} />) as HTMLCanvasElement;
  const whiteboard = new Whiteboard(props.container, props.strokes);
  onMount(() => {
    whiteboard.init(canvas!);
  });

  createEffect(() => {
    whiteboard.strokes = props.strokes;
    whiteboard.redraw();
  });

  return (
    <>
      {canvas}
      <Toolbar whiteboard={whiteboard} save={props.save} />
    </>
  );
};
