import dedent from 'dedent-js'

export const html5 = (strings: TemplateStringsArray, ...values: (string | number)[]) => {
  return (
    <Editor lang="html" readOnly>
      {dedent(String.raw(strings, ...values))}
    </Editor>
  )
}
