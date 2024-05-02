import type { PollProps } from './Poll.tsx'

export default function MathPoll(props: PollProps) {
  const [value, setValue] = createSignal('')
  const [submittedValue, setSubmittedValue] = createSignal('')
  const submit = () => setSubmittedValue(value())

  let container: HTMLDivElement
  createEffect(async () => {
    const mathlive = await import('mathlive')
    const field = new mathlive.MathfieldElement()
    field.style = 'min-width: 250px;'
    field.addEventListener('input', () => setValue(field.value))
    field.addEventListener('change', submit)
    container.appendChild(field)
  })

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
        <div ref={container!} />
        <input type="submit" onClick={submit} />
      </BasicPoll>
    </>
  )
}
