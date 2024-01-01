import dedent from 'dedent-js'

export default (strings: TemplateStringsArray, ...values: (string | number)[]) => {
  return dedent(String.raw(strings, ...values))
}
