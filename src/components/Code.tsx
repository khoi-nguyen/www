import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-coy.css';

interface CodeProps {
  children?: JSX.Element[] | JSX.Element[] | string;
  editable?: boolean;
  lang?: keyof typeof Prism.languages;
}

export default function Code(props: CodeProps) {
  props = mergeProps({ lang: 'python' }, props);
  const code = <code>{props.children}</code>;

  onMount(() => {
    Prism.highlightElement(code as HTMLElement);
  });

  return <pre class={`language-${props.lang}`}>{code}</pre>;
}
