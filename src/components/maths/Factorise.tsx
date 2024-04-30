const query = graphql(`
  query Factorise($attempt: MathExpression!, $expr: MathExpression!) {
    expression(expr: $attempt) {
      isEqual(expr: $expr)
      isFactorised
    }
  }
`)

export default function Factorise(props: { expr: string }) {
  return (
    <MathPoll
      id={`factorise-${btoa(props.expr)}`}
      mark={async (attempt) => {
        const { expression } = await request(query, { attempt, expr: props.expr })
        return expression.isFactorised && expression.isEqual
      }}
    >
      Factorise <Maths tex={props.expr} />
    </MathPoll>
  )
}
