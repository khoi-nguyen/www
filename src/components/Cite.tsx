import bibliography from '~/bibliography';

interface CiteProps {
  key: keyof typeof bibliography;
  children?: JSX.Element;
  narrative?: boolean;
  reference?: boolean;
}

export default function Cite(props: CiteProps) {
  const entry = () => bibliography[props.key];
  return (
    <>
      <Show when={!props.reference} fallback={entry()[2]()}>
        <Show when={!props.narrative} fallback={entry()[1]}>
          ({entry()[0]}
          <Show when={props.children}>, {props.children}</Show>)
        </Show>
      </Show>
    </>
  );
}
