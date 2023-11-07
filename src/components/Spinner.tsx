import SpinnerSVG from '~/assets/spinner.svg';

interface SpinnerProps {
  inline?: boolean;
}

export default function Spinner(props: SpinnerProps) {
  const img = <img src={SpinnerSVG} alt="Loading" />;
  return (
    <Show when={!props.inline} fallback={img}>
      <div class="has-text-centered">{img}</div>
    </Show>
  );
}
