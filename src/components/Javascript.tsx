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
    if (!props.react) {
      return dedent`
        <script type="module">
          ${code}
        </script>
      `;
    }
    return dedent`
      <div id="app">
      </div>
      <script type="module">
        import React, { useState, useEffect, useMemo } from 'https://cdn.jsdelivr.net/npm/react@18.2.0/+esm';
        import ReactDOM from 'https://cdn.jsdelivr.net/npm/react-dom@18.2.0/+esm';

        ${transpile(code)}
        const root = ReactDOM.createRoot(document.getElementById('app'));
        root.render(React.createElement(${props.reactAppName}, null));
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
