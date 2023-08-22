export default (strings: TemplateStringsArray, ...values: (string | number)[]) => {
  const tex = String.raw(strings, ...values);
  const display = tex.startsWith('\n');
  return <Maths {...{ tex, display }} />;
};
