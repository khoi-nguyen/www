import type bibliography from '~/bibliography';

interface SlideProps {
  children?: JSX.Element;
  cite?: [keyof typeof bibliography, JSX.Element | string];
  columns?: boolean;
  split?: boolean;
  title?: string | (() => JSX.Element);
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
  createEffect(
    on(time, () => {
      setTimeout(() => {
        setTime(datetime());
      }, 1000);
    }),
  );

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
