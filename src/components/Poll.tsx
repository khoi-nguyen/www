import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons/index.js'
import { io } from 'socket.io-client'
import { userId } from '~/lib/uid'
import type { PollAnswer } from '~/routes/api/poll'

type PollAnswers<T> = { [key: string]: PollAnswer<T> }

interface BasicPollProps<T> {
  children: JSX.Element | JSX.Element[] | string
  fallback?: JSX.Element
  id?: string
  mark: (value: T) => Promise<boolean> | boolean
  setValue: (newValue: T) => void
  showAnswers?: (answers: PollAnswers<T>) => JSX.Element | JSX.Element[]
  value: T
}

const socket = io({ path: '/api/poll' })
export function BasicPoll<T>(props: BasicPollProps<T>) {
  const [answers, setAnswers] = createStore<PollAnswers<T>>({})
  const [admin] = useSession()
  const [status, setStatus] = createSignal<'pending' | 'correct' | 'incorrect'>('pending')
  createEffect(
    on(
      () => props.value,
      async () => {
        const correct = await props.mark(props.value)
        if (props.id) {
          localStorage.setItem('poll-' + props.id, JSON.stringify(props.value))
          const pollAnswer: PollAnswer<T> = {
            correct,
            pollId: props.id,
            userId: userId(),
            value: props.value,
          }
          socket.emit('send-poll-answer', pollAnswer)
        }
        setStatus(correct ? 'correct' : 'incorrect')
      },
      { defer: true },
    ),
  )

  onMount(async () => {
    const storedValue = localStorage.getItem('poll-' + props.id)
    if (storedValue !== null) {
      const value = JSON.parse(storedValue) as T
      props.setValue(value)
      setStatus((await props.mark(value)) ? 'correct' : 'incorrect')
    }
    if (props.id && admin()) {
      socket.on('poll-answer-received', (data: PollAnswer<T>) => {
        setAnswers(data.userId, data)
      })
    }
  })

  return (
    <div class={'block poll ' + status()}>
      <Show when={props.fallback && status() !== 'pending'} fallback={props.children}>
        {props.fallback}
      </Show>
      <Show when={status() !== 'pending'}>
        {' '}
        <Fa icon={status() === 'correct' ? faCheck : faXmark} />
      </Show>
      <Show when={admin()}>{props.showAnswers && props.showAnswers(answers)}</Show>
    </div>
  )
}

interface PollProps {
  children?: JSX.Element | JSX.Element[] | string
  id: string
  mark: (value: string) => Promise<boolean> | boolean
  showAnswers?: (answers: PollAnswers<string>) => JSX.Element | JSX.Element[]
}

export default function Poll(props: PollProps) {
  const [value, setValue] = createSignal('')
  const [submittedValue, setSubmittedValue] = createSignal('')
  const handleInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (event) => {
    setValue(event.currentTarget.value)
  }

  return (
    <>
      {props.children}
      <BasicPoll
        id={props.id}
        mark={props.mark}
        value={submittedValue()}
        setValue={setValue}
        showAnswers={props.showAnswers}
        fallback={value()}
      >
        <input type="text" value={value()} onInput={handleInput} />
        <input type="submit" onClick={() => setSubmittedValue(value())} />
      </BasicPoll>
    </>
  )
}

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
