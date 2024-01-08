import { transpile } from '~/lib/transpile'

interface JavascriptProps {
  code?: string
  mode?: 'react' | 'svelte'
  appName?: string
  children?: JSX.Element
  onExecuted?: () => void
}

/**
 * Fix imports so that they're done over CDN
 */
function fixImports(code: string): string {
  const importRegex = /(import\s+.+\s+from\s+)['"](.+)['"]\s*;?/g
  return code.replace(
    importRegex,
    (_, begin, packageName) => `${begin}'https://esm.sh/${packageName}';`,
  )
}

export default function Javascript(props: JavascriptProps) {
  props = mergeProps({ appName: 'App' }, props)
  const [ready, setReady] = createSignal(false)
  let compile: typeof import('svelte/compiler').compile

  onMount(async () => {
    if (props.mode === 'svelte') {
      const compiler = await import('svelte/compiler')
      compile = compiler.compile
    }
    setReady(true)
  })

  const code = () => {
    if (!ready()) {
      return ''
    }
    let code = fixImports(props.code ? props.code : String(props.children || ''))
    if (props.mode === 'svelte') {
      const { js } = compile(code, { sveltePath: 'https://esm.sh/svelte' })
      code = ts.raw`
        ${js.code}
        const app = new Component({ target: document.getElementById('app') });
      `
    } else if (props.mode === 'react') {
      code = ts.raw`
        import React, { useState, useEffect, useMemo } from 'https://esm.sh/react';
        import ReactDOM from 'https://esm.sh/react-dom';
        ${transpile(code)}
        const root = ReactDOM.createRoot(document.getElementById('app'));
        root.render(React.createElement(${props.appName!}, null));
      `
    }
    return html.raw`
      <div id="app">
      </div>
      <script type="module">
      ${code}
      </script>
    `
  }

  createEffect(
    on(code, () => {
      if (props.onExecuted) {
        props.onExecuted()
      }
    }),
  )

  const [open, setOpen] = createSignal(false)

  return (
    <>
      <Html code={code()} />
      <Show when={props.mode}>
        <Modal open={open()} onClose={() => setOpen(false)}>
          <Editor lang="html" code={code()} />
        </Modal>
        <div>
          <small>
            <a onClick={() => setOpen(!open())}>Show transpiled code</a>
          </small>
        </div>
      </Show>
    </>
  )
}
