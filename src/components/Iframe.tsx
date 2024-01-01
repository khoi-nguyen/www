interface IframeProps {
  height?: string | number
  src: string
  width?: string | number
}

export default (props: IframeProps) => {
  props = mergeProps({ height: 875, width: '100%' }, props)
  return <iframe src={props.src} width={props.width} height={props.height} class="clickable" />
}
