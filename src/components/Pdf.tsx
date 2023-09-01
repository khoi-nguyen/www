interface PdfProps {
  page?: number;
  src: string;
  width?: string | number;
  height?: string | number;
  hideToolbar?: boolean;
}

export default function Pdf(props: PdfProps) {
  props = mergeProps({ width: '100%', height: 875 }, props);
  const src = () => {
    return (
      props.src +
      '#toolbar=' +
      (props.hideToolbar ? '0' : '1') +
      (props.page ? `&page=${props.page}` : '')
    );
  };
  return (
    <embed
      class="clickable"
      src={src()}
      width={props.width}
      height={props.height}
      type="application/pdf"
    />
  );
}
