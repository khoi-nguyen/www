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
  return code.replace(
    /(import\s+(\w+,?\s*)?(\{[^}]*\})?\s*(from\s*)?)['"](.+)['"]\s*;?/gm,
    (_, begin, __, ___, ____, packageName) => `${begin}'https://esm.sh/${packageName}';`,
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
    let code = props.code ? props.code : String(props.children || '')
    if (props.mode === 'svelte') {
      code = compile(code).js.code
      code += ts.raw`new Component({ target: document.getElementById('app') });`
    } else if (props.mode === 'react') {
      code = ts.raw`
        import React, { useState, useEffect, useMemo } from 'react';
        import ReactDOM from 'react-dom';
        ${transpile(code)}
        const root = ReactDOM.createRoot(document.getElementById('app'));
        root.render(React.createElement(${props.appName!}, null));
      `
    }
    return html.raw`
      <div id="app">
      </div>
      <script type="module">
      ${fixImports(code)}
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
