import { transform } from '@babel/standalone';
import { createUniqueId } from 'solid-js';

interface JavascriptProps {
  code?: string;
  react?: boolean;
  children?: JSX.Element;
  onExecuted?: () => void;
}

export default function Javascript(props: JavascriptProps) {
  const id = createUniqueId();

  const code = () => {
    let value = `(async () => {`;
    if (props.react) {
      value += `await import('https://unpkg.com/react@18.2.0/umd/react.development.js');`;
      value += `await import('https://unpkg.com/react-dom@18.2.0/umd/react-dom.development.js');`;
    }
    value += props.children ? String(props.children) : String(props.code);
    if (props.react) {
      value += `const root = ReactDOM.createRoot(document.getElementById(id));\n`;
      value += `root.render(<App />)`;
    }
    return `${value} })();`;
  };

  createEffect(async () => {
    eval(transform(code(), { presets: ['react'] }).code as string);
  });

  return (
    <>
      <div id={id}></div>
    </>
  );
}
