interface PdfProps {
  page?: number;
  src: string;
  width: string | number;
  height: string | number;
}

export default function Pdf(props: PdfProps) {
  props = mergeProps({ width: '100%', height: 500 }, props);
  const src = () => {
    return props.src + '#toolbar=0' + (props.page ? `&page=${props.page}` : '');
  };
  return <embed src={src()} width={props.width} height={props.height} type="application/pdf" />;
}
