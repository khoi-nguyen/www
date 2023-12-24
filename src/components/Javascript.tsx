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
    return String.raw`
      (async () => {
        if (${props.react ? 1 : 0} === 1) {
          await Promise.all([
            import('https://unpkg.com/react@18.2.0/umd/react.development.js'),
            import('https://unpkg.com/react-dom@18.2.0/umd/react-dom.development.js'),
          ]);
        }
        ${props.code || ''}
        ${String(props.children) || ''}
        if (${props.react ? 1 : 0} === 1) {
          const root = ReactDOM.createRoot(document.getElementById('${id}'));
          root.render(<App />);
        }
      })();
    `;
  };

  createEffect(async () => {
    eval(transform(code(), { presets: ['react'] }).code as string);
    if (props.onExecuted) {
      props.onExecuted();
    }
  });

  return (
    <>
      <div id={id}></div>
    </>
  );
}
