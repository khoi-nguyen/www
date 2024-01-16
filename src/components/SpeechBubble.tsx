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
}

export default function SpeechBubble(props: SpeechBubbleProps) {
  props = mergeProps({ image: 'tuxie' as const, height: 200 }, props)
  return (
    <div class="columns">
      <div class="is-narrow">
        <img src={images[props.image!]} alt={props.image} height={props.height} />
      </div>
      <div class="speech-bubble-right">{props.children}</div>
    </div>
  )
}
