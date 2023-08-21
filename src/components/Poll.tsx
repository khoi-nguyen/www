import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons/index.js';

interface BasicPollProps<T> {
  children: JSX.Element | JSX.Element[] | string;
  fallback?: JSX.Element;
  id?: string;
  mark: (value: T) => Promise<boolean> | boolean;
  setValue: (newValue: T) => void;
  value: T;
}

export function BasicPoll<T>(props: BasicPollProps<T>) {
  const [status, setStatus] = createSignal<'pending' | 'correct' | 'incorrect'>('pending');
  createEffect(
    on(
      () => props.value,
      async () => {
        localStorage.setItem('poll-' + props.id, JSON.stringify(props.value));
        setStatus((await props.mark(props.value)) ? 'correct' : 'incorrect');
      },
      { defer: true },
    ),
  );

  onMount(async () => {
    const storedValue = localStorage.getItem('poll-' + props.id);
    if (storedValue !== null) {
      const value = JSON.parse(storedValue) as T;
      props.setValue(value);
      setStatus((await props.mark(value)) ? 'correct' : 'incorrect');
    }
  });

  return (
    <>
      <div class={'poll ' + status()}>
        <Show when={props.fallback && status() !== 'pending'} fallback={props.children}>
          {props.fallback}
        </Show>
        <Show when={status() !== 'pending'}>
          {' '}
          <Fa icon={status() === 'correct' ? faCheck : faXmark} />
        </Show>
      </div>
    </>
  );
}

interface PollProps {
  children?: JSX.Element | JSX.Element[] | string;
  id: string;
  mark: (value: string) => Promise<boolean> | boolean;
}

export default function Poll(props: PollProps) {
  const [value, setValue] = createSignal('');
  const [submittedValue, setSubmittedValue] = createSignal('');
  const handleInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (event) => {
    setValue(event.currentTarget.value);
  };

  return (
    <>
      {props.children}
      <BasicPoll
        id={props.id}
        mark={props.mark}
        value={submittedValue()}
        setValue={setValue}
        fallback={value()}
      >
        <input type="text" value={value()} onInput={handleInput} />
        <input type="submit" onClick={() => setSubmittedValue(value())} />
      </BasicPoll>
    </>
  );
}

interface MultipleChoiceProps {
  children?: JSX.Element | JSX.Element[] | string;
  choices: (Component<{}> | string)[];
  correct: number;
  id: string;
}

export function MultipleChoice(props: MultipleChoiceProps) {
  const [value, setValue] = createSignal<number | undefined>(undefined);
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
            <button onClick={() => setValue(i)}>
              {typeof choice === 'function' ? choice({}) : choice}
            </button>
          )}
        </For>
      </BasicPoll>
    </>
  );
}
