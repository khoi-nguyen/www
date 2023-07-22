import dedent from 'dedent-js';

type Tag<T> = (strings: TemplateStringsArray, ...values: (string | number)[]) => T;

export const tex: Tag<JSX.Element> = (strings, ...values) => {
  const tex = String.raw(strings, ...values);
  const display = tex.startsWith('\n');
  return <Maths {...{ tex, display }} />;
};

export const py: Tag<string> = (strings, ...values) => {
  return dedent(String.raw(strings, ...values));
};
