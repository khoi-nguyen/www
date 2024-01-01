import Whiteboard from '~/lib/Whiteboard'
import type { Stroke } from '~/lib/Whiteboard'

interface WhiteboardProps {
  container: HTMLElement
  height: number
  strokes: Stroke[]
  width: number
}

export default (props: WhiteboardProps) => {
  const canvas = (<canvas width={props.width} height={props.height} />) as HTMLCanvasElement
  const whiteboard = new Whiteboard(props.container, canvas, props.strokes)
  const context = useBoards()
  onMount(() => {
    whiteboard.init()
    whiteboard.canvas.addEventListener('boardChange', context.handleBoardChange)
  })

  createEffect(() => {
    whiteboard.strokes = props.strokes
    whiteboard.redraw()
  })

  return (
    <>
      {canvas}
      <Toolbar whiteboard={whiteboard} />
    </>
  )
}
