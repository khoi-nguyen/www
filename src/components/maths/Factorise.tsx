const query = graphql(`
  query Factorise($attempt: MathExpression!, $expr: MathExpression!) {
    expression(expr: $attempt) {
      isEqual(expr: $expr)
      isFactorised
    }
  }
`)

const generateQuery = graphql(`
  query GenerateFactorisation {
    generate {
      factorisation {
        expanded {
          expr
        }
      }
    }
  }
`)

export default function Factorise(props: { expr?: string }) {
  const [expr, setExpr] = createSignal(props.expr || '')

  const generate = async () => {
    const { generate } = await request(generateQuery, {})
    setExpr(generate.factorisation.expanded.expr)
  }

  onMount(() => {
    if (!expr()) {
      generate()
    }
  })

  return (
    <MathPoll
      id={`factorise-${btoa(expr())}`}
      mark={async (attempt) => {
        const { expression } = await request(query, { attempt, expr: expr() })
        return expression.isFactorised && expression.isEqual
      }}
    >
      Factorise <Maths tex={expr()} />
    </MathPoll>
  )
}
