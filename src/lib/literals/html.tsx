import dedent from 'dedent-js';

export const css = (strings: TemplateStringsArray, ...values: (string | number)[]) => {
  return <Editor lang="css">{dedent(String.raw(strings, ...values))}</Editor>;
};

export const js = (strings: TemplateStringsArray, ...values: (string | number)[]) => {
  return <Editor lang="js">{dedent(String.raw(strings, ...values))}</Editor>;
};

export const html = (strings: TemplateStringsArray, ...values: (string | number)[]) => {
  return <Editor lang="html">{dedent(String.raw(strings, ...values))}</Editor>;
};
