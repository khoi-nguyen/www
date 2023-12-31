import { transpile } from '~/lib/transpile';

interface JavascriptProps {
  code?: string;
  react?: boolean;
  reactAppName?: string;
  children?: JSX.Element;
  onExecuted?: () => void;
}

export default function Javascript(props: JavascriptProps) {
  props = mergeProps({ reactAppName: 'App' }, props);

  const code = () => {
    const code = props.code ? props.code : String(props.children);
    if (!props.react || !code) {
      return code;
    }
    return String.raw`
      <div id="app">
      </div>
      <script src="https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.production.min.js"></script>
      <script>
        ${transpile(code)}
        const root = ReactDOM.createRoot(document.getElementById('app'));
        ${transpile('root.render(<' + props.reactAppName + ' />);')}
      </script>
    `;
  };

  createEffect(
    on(code, () => {
      if (props.onExecuted) {
        props.onExecuted();
      }
    }),
  );

  return <Html code={code()} />;
}
