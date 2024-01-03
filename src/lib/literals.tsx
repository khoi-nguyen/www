import { JupyterProps } from '~/components/Jupyter'

type Literal<T> = (strings: TemplateStringsArray, ...values: (string | number)[]) => T

const id = <T,>(x: T) => x

function createLiteral<T>(fn: (str: string) => T, applyDedent = true): Literal<T> {
  return (strings, ...values) => {
    if (applyDedent) {
      return fn(dedent(String.raw(strings, ...values)))
    } else {
      return fn(String.raw(strings, ...values))
    }
  }
}

export function jupyter(props: Omit<JupyterProps, 'children'> = {}) {
  return createLiteral<JSX.Element>((code) => <Jupyter {...props}>{code}</Jupyter>)
}

export const py = {
  run: createLiteral<JSX.Element>((code) => <Python>{code}</Python>),
  jupyter: jupyter(),
  hl: createLiteral<JSX.Element>((code) => <Editor lang="python" readOnly code={code} />),
  raw: createLiteral<string>(id),
  plot: createLiteral<JSX.Element>((code) => {
    const imports = 'import matplotlib.pyplot as plt\nimport numpy as np\nax=plt.gca()\n'
    code = imports + code
    return (
      <div class="has-text-centered">
        <Python>{code}</Python>
      </div>
    )
  }),
}

export const tex = createLiteral(
  (code) => <Maths tex={code} display={code.startsWith('\n')} />,
  false,
)

function makeIf(solve: boolean) {
  return createLiteral<string>((code) => {
    if (!solve) {
      return ''
    }
    return code.substring(1, code.length - 1)
  }, false)
}

export const react = {
  run: createLiteral<JSX.Element>((code) => <Javascript mode="react">{code}</Javascript>),
  jupyter: jupyter({ lang: 'react' }),
  hl: createLiteral<JSX.Element>((code) => <Editor lang="tsx" code={code} />),
  raw: createLiteral<string>(id),
  if: makeIf,
}

export const svelte = {
  run: createLiteral<JSX.Element>((code) => <Javascript mode="svelte">{code}</Javascript>),
  jupyter: jupyter({ lang: 'svelte' }),
  hl: createLiteral<JSX.Element>((code) => <Editor lang="svelte" code={code} />),
  raw: createLiteral<string>(id),
  if: makeIf,
}

export const js = {
  run: createLiteral<JSX.Element>((code) => <Javascript>{code}</Javascript>),
  hl: createLiteral<JSX.Element>((code) => <Editor lang="tsx" readOnly code={code} />),
  raw: createLiteral<string>(id),
  if: makeIf,
}

export const ts = js

export const html = {
  run: createLiteral<JSX.Element>((code) => <Html>{code}</Html>),
  jupyter: jupyter({ lang: 'html' }),
  hl: createLiteral<JSX.Element>((code) => <Editor lang="html" readOnly code={code} />),
  raw: createLiteral<string>(id),
  if: makeIf,
}
