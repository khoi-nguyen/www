interface GeogebraProps {
  height?: number
  id: string
  width?: number
}

export default function Geogebra(props: GeogebraProps) {
  props = mergeProps({ height: 600, width: 900 }, props)
  const src = () => {
    let result = `https://www.geogebra.org/material/iframe/id/${props.id}`
    result += `/width/${props.width}/height/${props.height}`
    result += `/ai/false/smb/false/stb/false`
    return result
  }
  return (
    <iframe
      class="clickable"
      src={src()}
      height={props.height}
      width={props.width}
      allowfullscreen
    />
  )
}
