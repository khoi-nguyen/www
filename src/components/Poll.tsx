import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons/index.js';

interface BasicPollProps<T> {
  children: JSX.Element | JSX.Element[] | string;
  fallback?: JSX.Element;
  mark: (value: T) => Promise<boolean> | boolean;
  value: T;
}

export function BasicPoll<T>(props: BasicPollProps<T>) {
  const [status, setStatus] = createSignal<'pending' | 'correct' | 'incorrect'>('pending');
  createEffect(
    on(
      () => props.value,
      async () => {
        setStatus((await props.mark(props.value)) ? 'correct' : 'incorrect');
      },
      { defer: true },
    ),
  );

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
      <BasicPoll mark={props.mark} value={submittedValue()} fallback={value()}>
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
}

export function MultipleChoice(props: MultipleChoiceProps) {
  const [value, setValue] = createSignal<number | undefined>(undefined);
  return (
    <>
      {props.children}
      <BasicPoll value={value()} mark={(val) => val === props.correct}>
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
