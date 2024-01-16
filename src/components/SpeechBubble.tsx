import koi from '~/assets/koi.svg'
import tuxie from '~/assets/tuxie.svg'

const images = {
  koi,
  tuxie,
} as const

interface SpeechBubbleProps {
  children?: JSX.Element
  image?: keyof typeof images
  height?: number
  position?: 'right' | 'left'
}

export default function SpeechBubble(props: SpeechBubbleProps) {
  props = mergeProps({ image: 'tuxie', height: 200, position: 'right' } as const, props)
  return (
    <div class="columns">
      <div class="is-narrow">
        <img src={images[props.image!]} alt={props.image} height={props.height} />
      </div>
      <div class={'speech-bubble-' + props.position}>{props.children}</div>
    </div>
  )
}
