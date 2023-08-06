import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons/index.js';

interface PollProps {
  children: JSX.Element | JSX.Element[] | string;
  mark: (value: string) => Promise<boolean> | boolean;
}

export default function Poll(props: PollProps) {
  const [value, setValue] = createSignal('');
  const [status, setStatus] = createSignal<'pending' | 'correct' | 'incorrect'>('pending');
  const handleInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (event) => {
    setValue(event.currentTarget.value);
  };
  const handleSubmit = async () => {
    const correct = await props.mark(value());
    setStatus(correct ? 'correct' : 'incorrect');
  };

  return (
    <>
      {props.children}
      <p class={'poll ' + status()}>
        <input
          type="text"
          value={value()}
          onInput={handleInput}
          readonly={status() !== 'pending'}
        />{' '}
        <Show
          when={status() !== 'pending'}
          fallback={<input type="submit" onClick={handleSubmit} />}
        >
          <Fa icon={status() === 'correct' ? faCheck : faXmark} />
        </Show>
      </p>
    </>
  );
}
