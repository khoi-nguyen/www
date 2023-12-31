interface HtmlProps {
  code?: string;
  children?: JSX.Element;
  onExecuted?: () => void;
}

export default function Html(props: HtmlProps) {
  const code = () => (props.children ? String(props.children) : String(props.code));
  const iframe = (<iframe width="100%" class="clickable" />) as HTMLIFrameElement;
  iframe.onload = () => {
    if (iframe.contentWindow) {
      iframe.style.height = iframe.contentWindow.document.documentElement.scrollHeight + 'px';
    }
  };

  createEffect(() => {
    iframe.srcdoc = code();
    if (props.onExecuted) {
      props.onExecuted();
    }
  });

  return iframe;
}
