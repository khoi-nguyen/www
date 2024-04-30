const query = graphql(`
  query Differentiate($attempt: MathExpression!, $expr: MathExpression!) {
    expression(expr: $expr) {
      derivative {
        isEqual(expr: $attempt)
      }
    }
  }
`)

export default function Differentiate(props: { expr: string }) {
  return (
    <MathPoll
      id={`differentiate-${btoa(props.expr)}`}
      mark={async (attempt) => {
        const { expression } = await request(query, { attempt, expr: props.expr })
        return expression.derivative.isEqual
      }}
    >
      Differentiate <Maths tex={props.expr} />
    </MathPoll>
  )
}
