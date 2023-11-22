import dedent from 'dedent-js';

export const css = (strings: TemplateStringsArray, ...values: (string | number)[]) => {
  return (
    <Editor lang="css" readOnly>
      {dedent(String.raw(strings, ...values))}
    </Editor>
  );
};

export const js = (strings: TemplateStringsArray, ...values: (string | number)[]) => {
  return (
    <Editor lang="tsx" readOnly>
      {dedent(String.raw(strings, ...values))}
    </Editor>
  );
};

export const html5 = (strings: TemplateStringsArray, ...values: (string | number)[]) => {
  return (
    <Editor lang="html" readOnly>
      {dedent(String.raw(strings, ...values))}
    </Editor>
  );
};

export const ts = (strings: TemplateStringsArray, ...values: (string | number)[]) => {
  return (
    <Editor lang="tsx" readOnly>
      {dedent(String.raw(strings, ...values))}
    </Editor>
  );
};
