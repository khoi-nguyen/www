import type paths from '~/images.json'

interface FigureProps {
  alt: string
  src: (typeof paths)[number]
  width?: number | string
  height?: number | string
  children?: JSX.Element | JSX.Element[]
}

export default function Figure(props: FigureProps) {
  const c = children(() => props.children)
  return (
    <div class="has-text-centered block" style={{ 'font-size': '0.8em' }}>
      <img src={'/images/' + props.src} alt={props.alt} width={props.width} height={props.height} />
      <Show when={c()}>
        <p>{c()}</p>
      </Show>
    </div>
  )
}
