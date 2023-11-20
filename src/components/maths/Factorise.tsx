interface FactoriseProps {
  expr: string;
}

export const Factorise = (props: FactoriseProps) => {
  const [expr, setExpr] = createSignal<string>('');
  createEffect(() => setExpr(props.expr));

  const solution = () => `factor(${expr()})`;

  return (
    <>
      <p>
        Factorise <MathsField value={expr()} onChange={setExpr} />
      </p>
      <p>
        <MathsField value={solution()} display readOnly />
      </p>
    </>
  );
};
