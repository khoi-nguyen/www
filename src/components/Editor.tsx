import type { CodeJar } from 'codejar';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-typescript';
import 'prismjs/themes/prism-coy.css';

interface EditorProps {
  children?: JSX.Element;
  lang?: keyof typeof Prism.languages;
  onUpdate?: (code: string) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  hideUntil?: Date;
  solution?: string;
}

export default function Editor(props: EditorProps) {
  props = mergeProps({ lang: 'python' }, props);
  const textArea = (<code />) as HTMLElement;
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
    if (editor) {
      editor.destroy();
    }
  });

  const [admin] = useSession();
  const solve = () => {
    if (props.solution) {
      editor.updateCode(props.solution);
    }
  };

  const showSolutionButton = () => {
    if (!props.solution) {
      return false;
    }
    if (!props.hideUntil) {
      return true;
    }
    return new Date() > props.hideUntil || admin();
  };

  return (
    <>
      <pre class={`language-${props.lang} clickable`}>{textArea}</pre>
      <Show when={showSolutionButton()}>
        <button onClick={solve}>Solve</button>
      </Show>
    </>
  );
}
