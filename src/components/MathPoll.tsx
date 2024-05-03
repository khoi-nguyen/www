import type { PollProps } from './Poll'

interface MathPollProps extends PollProps {
  defaultValue: string
}

export default function MathPoll(props: MathPollProps) {
  const [value, setValue] = createSignal('')
  const [submittedValue, setSubmittedValue] = createSignal('')
  const submit = () => setSubmittedValue(value())
  return (
    <>
      {props.children}
      <BasicPoll
        id={props.id}
        mark={props.mark}
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
