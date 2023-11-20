import runPython from '~/lib/pyodide.api';

const latexify = async (expr: string) => {
  if (!expr) {
    return undefined;
  }
  const result = await runPython(py`
    if 'sympy' not in globals():
        import sympy
    sympy.latex(sympy.sympify("${expr}", evaluate=False))
  `);
  return result.output;
};

interface MathsFieldProps {
  display?: boolean;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  value: string;
}

export const MathsField = (props: MathsFieldProps) => {
  let field: HTMLInputElement;

  const [mounted, setMounted] = createSignal(false);
  onMount(() => setMounted(true));

  const value = () => {
    if (!mounted()) {
      return undefined;
    }
    return props.value;
  };
  const [latex] = createResource(value, latexify);

  const [editing, setEditing] = createSignal(false);
  createEffect(() => {
    if (editing()) {
      field.focus();
    }
  });

  return (
    <>
      <Show when={latex() && !editing()}>
        <span onClick={() => !props.readOnly && setEditing(true)}>
          <Maths tex={latex()} display={props.display} />
        </span>
      </Show>
      <Show when={!latex() || editing()}>
        <input
          ref={field!}
          type="text"
          value={props.value}
          onBlur={() => setEditing(false)}
          onChange={(event) => props.onChange && props.onChange(event.target.value)}
        />
      </Show>
    </>
  );
};
