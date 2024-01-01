interface ProofProps {
  children?: JSX.Element | JSX.Element[]
  sketch?: boolean
}

export default function Proof(props: ProofProps) {
  return (
    <details>
      <summary class="clickable">
        <Show when={props.sketch}>Sketch</Show> Proof
      </summary>
      {props.children}
    </details>
  )
}
