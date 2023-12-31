interface HtmlProps {
  code?: string;
  children?: JSX.Element;
  onExecuted?: () => void;
}

export default function Html(props: HtmlProps) {
  const code = () => (props.children ? String(props.children) : String(props.code));
  const iframe = (<iframe width="100%" />) as HTMLIFrameElement;

  createEffect(() => {
    iframe.srcdoc = code();
    if (props.onExecuted) {
      props.onExecuted();
    }
  });

  return iframe;
}
