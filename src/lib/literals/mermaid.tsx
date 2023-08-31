export default (strings: TemplateStringsArray, ...values: (string | number)[]) => {
  const code = String.raw(strings, ...values);
  return <Mermaid>{code}</Mermaid>;
};
