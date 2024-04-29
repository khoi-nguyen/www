interface MultipleChoiceProps {
  children?: JSX.Element | JSX.Element[] | string
  choices: (Component<{}> | string)[]
  correct: number
  id?: string
}

export function MultipleChoice(props: MultipleChoiceProps) {
  const [value, setValue] = createSignal<number | undefined>(undefined)
  return (
    <>
      {props.children}
      <BasicPoll
        id={props.id}
        value={value()}
        setValue={setValue}
        mark={(val) => val === props.correct}
      >
        <For each={props.choices}>
          {(choice, i) => (
            <Button onClick={() => setValue(i)}>
              {typeof choice === 'function' ? choice({}) : choice}
            </Button>
          )}
        </For>
      </BasicPoll>
    </>
  )
}
