import { compile } from 'svelte/compiler';
import { transpile } from '~/lib/transpile';

interface JavascriptProps {
  code?: string;
  react?: boolean;
  reactAppName?: string;
  svelte?: boolean;
  children?: JSX.Element;
  onExecuted?: () => void;
}

export default function Javascript(props: JavascriptProps) {
  props = mergeProps({ reactAppName: 'App' }, props);

  const code = () => {
    let code = props.code ? props.code : String(props.children);
    if (!props.react && !props.svelte) {
      return dedent`
        <script type="module">
          ${code}
        </script>
      `;
    }
    if (props.svelte) {
      const { js } = compile(code);
      code = js.code.replace('import "svelte/internal/disclose-version";', '');
      code = code.replace('svelte/internal', 'https://cdn.skypack.dev/svelte@4.2.8/internal');
      return dedent`
        <div id="app">
        </div>
        <script type="module">
          ${code}
          const app = new Component({target: document.getElementById('app')});
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
