import bibliography from '~/bibliography';

interface CiteProps {
  key: keyof typeof bibliography;
  children?: JSX.Element;
  narrative?: boolean;
  reference?: boolean;
}

type BibEntry = [string, () => JSX.Element];

export default function Cite(props: CiteProps) {
  const entry = bibliography[props.key] as BibEntry;
  return (
    <>
      <Show when={!props.reference}>
        {props.narrative || '('}
        {entry[0]}
        <Show when={props.children}>, {props.children}</Show>
        {props.narrative || ')'}
      </Show>
      <Show when={props.reference}>{entry[1]()}</Show>
    </>
  );
}
