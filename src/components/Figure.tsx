interface FigureProps {
  alt: string
  src: string
  children?: JSX.Element | JSX.Element[]
}

export default function Figure(props: FigureProps) {
  return (
    <div class="has-text-centered">
      <img src={'/images/' + props.src} alt={props.alt} />
      <Show when={props.children}>
        <p>{props.children}</p>
      </Show>
    </div>
  )
}
