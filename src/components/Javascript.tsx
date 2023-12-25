import { transform } from '@babel/standalone';
import { createUniqueId } from 'solid-js';

interface JavascriptProps {
  code?: string;
  react?: boolean;
  reactAppName?: string;
  children?: JSX.Element;
  onExecuted?: () => void;
}

export default function Javascript(props: JavascriptProps) {
  props = mergeProps({ reactAppName: 'App' }, props);
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
          root.render(<${props.reactAppName} />);
        }
      })();
    `;
  };

  createEffect(async () => {
    const tcode = transform(code(), { presets: ['react'] }).code as string;
    Function(tcode)();
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
