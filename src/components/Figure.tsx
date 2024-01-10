interface FigureProps {
  alt: string
  src: string
  width?: number
  height?: number
  children?: JSX.Element | JSX.Element[]
}

export default function Figure(props: FigureProps) {
  return (
    <div class="has-text-centered">
      <img src={'/images/' + props.src} alt={props.alt} width={props.width} height={props.height} />
      <Show when={props.children}>
        <p>{props.children}</p>
      </Show>
    </div>
  )
}
