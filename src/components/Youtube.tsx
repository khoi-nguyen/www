interface YoutubeProps {
  height?: number;
  src: string;
  width?: number;
  zoom?: number;
}

export default function Youtube(props: YoutubeProps) {
  props = mergeProps({ width: 560, height: 315, zoom: 1 }, props);
  return (
    <iframe
      width={props.width}
      height={props.height}
      src={props.src.replace('watch?v=', 'embed/')}
      allow="autoplay; encrypted-media"
      allowfullscreen
    ></iframe>
  );
}
