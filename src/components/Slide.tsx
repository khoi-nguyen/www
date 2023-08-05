import type bibliography from '~/bibliography';

interface SlideProps {
  children?: JSX.Element;
  cite?: [keyof typeof bibliography, JSX.Element | string];
  columns?: boolean;
  split?: boolean;
  title?: string | (() => JSX.Element);
}

export default function Slide(props: SlideProps) {
  props = mergeProps(
    {
      split: !props.columns,
    },
    props,
  );
  return (
    <div>
      <Show when={props.title}>
        <h1>
          {typeof props.title === 'function' ? props.title() : props.title}
          <Show when={props.cite}>
            {' '}
            <small>
              <Cite key={props.cite![0]}>{props.cite![1]}</Cite>
            </small>
          </Show>
        </h1>
      </Show>
      <div classList={{ split: props.split, columns: props.columns, 'slide-contents': true }}>
        {props.children}
      </div>
    </div>
  );
}
