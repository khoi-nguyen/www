interface YoutubeProps {
  height?: number
  src: string
  width?: number
  zoom?: number
}

export default function Youtube(props: YoutubeProps) {
  return (
    <div class="has-text-centered block">
      <iframe
        class="clickable"
        width={(props.width || 560) * (props.zoom || 1)}
        height={(props.height || 315) * (props.zoom || 1)}
        src={props.src.replace('watch?v=', 'embed/')}
        allow="autoplay; encrypted-media"
        allowfullscreen
      />
    </div>
  )
}
