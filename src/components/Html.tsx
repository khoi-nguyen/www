interface HtmlProps {
  code?: string;
  children?: JSX.Element;
}

export default function Html(props: HtmlProps) {
  const host = (<div />) as HTMLDivElement;
  const code = () => (props.children ? String(props.children) : String(props.code));

  let shadow: ShadowRoot;
  onMount(() => {
    shadow = host.attachShadow({ mode: 'open' });
  });

  createEffect(() => {
    if (shadow) {
      shadow.innerHTML = code();
    }
  });

  return <>{host}</>;
}
