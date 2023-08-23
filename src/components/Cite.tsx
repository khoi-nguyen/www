import bibliography from '~/bibliography';

interface CiteProps {
  key: keyof typeof bibliography;
  children?: JSX.Element;
  narrative?: boolean;
  reference?: boolean;
}

export default function Cite(props: CiteProps) {
  const c = children(() => props.children);
  const entry = () => bibliography[props.key];
  return (
    <>
      <Show when={!props.reference} fallback={entry()[2]()}>
        <Show when={!props.narrative} fallback={entry()[1]}>
          ({entry()[0]}
          <Show when={c()}>, {c()}</Show>)
        </Show>
      </Show>
    </>
  );
}
