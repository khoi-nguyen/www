import meta from './stack.json';

export default () => (
  <Page meta={meta}>
    <h2>General</h2>
    <p>
      The website is written in <a href="https://typescriptlang.org">Typescript</a>. I use{' '}
      <a href="https://solidjs.com">Solid</a> and{' '}
      <a href="https://start.solidjs.com/">Solid Start</a> (its associated <em>meta-framework</em>).
      In a nutshell, they are kind of like <a href="https://react.dev">React</a> and{' '}
      <a href="https://nextjs.org">Next.js</a>, in a sense that there are Components-based and use{' '}
      <abbr title="JavaScript Syntax Extension">JSX</abbr>. The big difference is that Solid does
      not use a Virtual <abbr title="Document Object Model">DOM</abbr> and is actually reactive.
    </p>
    <h2>Mathematics formulae</h2>
    <p>
      {tex`\LaTeX`} formulae (e.g. {tex`x^2`}) are rendered via{' '}
      <a href="https://katex.org">KaTeX</a>. Formulae that start with a newline are shown in{' '}
      <em>display mode</em>:
      {tex`
        \int_a^b f'(x) \dd x = f(b) - f(a).
      `}
    </p>
  </Page>
);
