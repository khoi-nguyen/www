import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons/index.js';

interface BasicPollProps<T> {
  children: JSX.Element | JSX.Element[] | string;
  mark: (value: T) => Promise<boolean> | boolean;
  value: T;
}

export const BasicPoll: Component<BasicPollProps<any>> = (props) => {
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
        {props.children}
        <Show when={status() !== 'pending'}>
          <Fa icon={status() === 'correct' ? faCheck : faXmark} />
        </Show>
      </div>
    </>
  );
};

interface PollProps {
  children: JSX.Element | JSX.Element[] | string;
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
      <BasicPoll mark={props.mark} value={submittedValue()}>
        <input type="text" value={value()} onInput={handleInput} />
        <input type="submit" onClick={() => setSubmittedValue(value())} />
      </BasicPoll>
    </>
  );
}
