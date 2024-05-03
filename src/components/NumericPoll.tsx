import { MathPollProps } from './MathPoll'

const query = graphql(`
  query CheckEquality($attempt: MathExpression!, $answer: MathExpression!) {
    expression(expr: $attempt) {
      isEqual(expr: $answer)
    }
  }
`)

interface NumericalPollProps extends Omit<MathPollProps, 'mark'> {
  answer: string
}

export default function NumericalPoll(props: NumericalPollProps) {
  const [value, setValue] = createSignal('')
  const [submittedValue, setSubmittedValue] = createSignal('')
  const submit = () => setSubmittedValue(value())
  return (
    <>
      {props.children}
      <BasicPoll
        id={props.id}
        mark={async (attempt: string) => {
          const { expression } = await request(query, { attempt, answer: props.answer })
          return expression.isEqual
        }}
        value={submittedValue()}
        setValue={setValue}
        showAnswers={props.showAnswers}
        fallback={() => <Maths tex={value()} />}
      >
        <MathField onChange={submit} onInput={setValue} defaultValue={props.defaultValue} />
      </BasicPoll>
    </>
  )
}
