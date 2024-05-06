const query = graphql(`
  query Differentiate($attempt: MathExpression!, $var: MathExpression!, $expr: MathExpression!) {
    expression(expr: $expr) {
      diff(var: $var) {
        isEqual(expr: $attempt)
      }
    }
  }
`)

export default function Differentiate(props: { expr: string; var?: string }) {
  return (
    <MathPoll
      id={`differentiate-${btoa(props.expr)}`}
      mark={async (attempt) => {
        const { expression } = await request(query, {
          attempt,
          expr: props.expr,
          var: props.var || 'x',
        })
        return expression.diff.isEqual
      }}
    >
      Differentiate <Maths tex={props.expr} />
      <Show when={props.var}>
        {' '}
        with respect to <Maths tex={props.var} />
      </Show>
    </MathPoll>
  )
}
