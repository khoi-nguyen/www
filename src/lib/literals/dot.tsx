export default (strings: TemplateStringsArray, ...values: (string | number)[]) => {
  const dot = String.raw(strings, ...values);
  return <Graphviz>{dot}</Graphviz>;
};
