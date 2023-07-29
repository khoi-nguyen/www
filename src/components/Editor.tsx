import type { CodeJar } from 'codejar';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-coy.css';

interface EditorProps {
  children?: JSX.Element;
  lang?: string;
  onUpdate?: (code: string) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
}

export default function Editor(props: EditorProps) {
  props = mergeProps({ lang: 'python' }, props);
  let textArea: HTMLElement;
  let editor: CodeJar;

  onMount(async () => {
    const CodeJar = await import('codejar');
    const highlight = (element: HTMLElement) => Prism.highlightElement(element);
    editor = CodeJar.CodeJar(textArea, highlight, { tab: '\t' });
    editor.updateCode(String(props.children));

    editor.onUpdate((code: string) => {
      if (props.onUpdate) {
        props.onUpdate(code);
      }
    });

    textArea.onkeydown = (event: KeyboardEvent) => {
      if (props.onKeyDown) {
        props.onKeyDown(event);
      }
    };
  });

  onCleanup(() => {
    editor.destroy();
  });

  return (
    <pre class={`language-${props.lang} clickable`}>
      <code ref={textArea!} />
    </pre>
  );
}
