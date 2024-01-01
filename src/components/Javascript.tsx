import { transpile } from '~/lib/transpile';

interface JavascriptProps {
  code?: string;
  mode?: 'react' | 'svelte';
  reactAppName?: string;
  children?: JSX.Element;
  onExecuted?: () => void;
}

export default function Javascript(props: JavascriptProps) {
  props = mergeProps({ reactAppName: 'App' }, props);
  const [ready, setReady] = createSignal(false);
  let compile: (code: string) => string;

  onMount(async () => {
    if (props.mode === 'svelte') {
      const compiler = await import('svelte/compiler');
      compile = compiler.compile;
    }
    setReady(true);
  });

  const code = () => {
    if (!ready()) {
      return '';
    }
    let code = props.code ? props.code : String(props.children);
    if (props.mode === 'svelte') {
      const { js } = compile(code, { sveltePath: 'https://cdn.skypack.dev/svelte@4.2.8' });
      return dedent`
        <div id="app">
        </div>
        <script type="module">
          ${js.code}
          const app = new Component({ target: document.getElementById('app') });
        </script>
      `;
    } else if (props.mode === 'react') {
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
    } else {
      return dedent`
        <script type="module">
          ${code}
        </script>
      `;
    }
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
