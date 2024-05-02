import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons/index.js'
import { io } from 'socket.io-client'
import { userId } from '~/lib/uid'
import type { PollAnswer } from '~/routes/api/poll'

type PollAnswers<T> = { [key: string]: PollAnswer<T> }

interface BasicPollProps<T> {
  children: JSX.Element | JSX.Element[] | string
  fallback?: JSX.Element | Component<{}>
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
  const total = () => Object.keys(answers).length
  const correct = () => {
    let correct = 0
    for (const user in answers) {
      if (answers[user].correct) {
        correct += 1
      }
    }
    return correct
  }
  const progress = () => correct() / (total() || 1)
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
        if (data.pollId === props.id) {
          setAnswers(data.userId, data)
        }
      })
    }
  })

  return (
    <div class="block">
      <div class={'poll ' + status()} style={{ display: 'flex', 'flex-direction': 'row' }}>
        <Show when={props.fallback && status() !== 'pending'}>
          <div onClick={() => setStatus('pending')}>
            {typeof props.fallback === 'function' ? props.fallback({}) : props.fallback}
          </div>
        </Show>
        <div>
          <div style={{ display: status() === 'pending' ? 'flex' : 'none' }}>{props.children}</div>
          <Show when={status() !== 'pending'}>
            {' '}
            <Fa icon={status() === 'correct' ? faCheck : faXmark} />
          </Show>
        </div>
      </div>
      <Show when={admin()}>{props.showAnswers && props.showAnswers(answers)}</Show>
      <Show when={admin() && !props.showAnswers}>
        <progress value={progress()} low={0.5} high={0.8}>
          {correct}/{total}
        </progress>
      </Show>
    </div>
  )
}

export interface PollProps {
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
