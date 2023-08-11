interface PdfProps {
  src: string;
  width: string | number;
  height: string | number;
}

export default function Pdf(props: PdfProps) {
  return <embed src={props.src} width={props.width} height={props.height} type="application/pdf" />;
}
