import type bibliography from '~/bibliography';

interface SlideProps {
  children?: JSX.Element;

  /** Add citation */
  cite?: [keyof typeof bibliography, JSX.Element | string];

  /** Whether the children are columns */
  columns?: boolean;

  /** Whether to split slide and have a blank right-hand side */
  split?: boolean;

  /** Slide title */
  title?: string | (() => JSX.Element) | JSX.Element;
}

function display(x: number) {
  return (x > 9 ? '' : '0') + String(x);
}

function datetime() {
  const date = new Date();
  return `${display(date.getHours())}:${display(date.getMinutes())}`;
}

export default function Slide(props: SlideProps) {
  props = mergeProps(
    {
      split: !props.columns,
    },
    props,
  );

  const [time, setTime] = createSignal(datetime());
  const clock = setInterval(() => {
    setTime(datetime());
  }, 1000);

  onCleanup(() => {
    clearInterval(clock);
  });

  return (
    <div>
      <Show when={props.title}>
        <h1 class="columns">
          <div>
            {typeof props.title === 'function' ? props.title() : props.title}
            <Show when={props.cite}>
              {(cite) => (
                <small>
                  {' '}
                  <Cite key={cite()[0]}>{cite()[1]}</Cite>
                </small>
              )}
            </Show>
          </div>
          <div class="time is-narrow">{time()}</div>
        </h1>
      </Show>
      <div classList={{ split: props.split, columns: props.columns, 'slide-contents': true }}>
        {props.children}
      </div>
    </div>
  );
}
