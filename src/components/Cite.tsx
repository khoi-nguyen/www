import bibliography from '~/bibliography';

interface CiteProps {
  key: keyof typeof bibliography;
  children?: JSX.Element;
  narrative?: boolean;
  reference?: boolean;
}

type BibEntry = [string, string, () => JSX.Element];

export default function Cite(props: CiteProps) {
  const entry = bibliography[props.key] as BibEntry;
  return (
    <>
      <Show when={!props.reference} fallback={entry[2]()}>
        <Show when={!props.narrative} fallback={entry[1]}>
          ({entry[0]}
          <Show when={props.children}>, {props.children}</Show>)
        </Show>
      </Show>
    </>
  );
}
