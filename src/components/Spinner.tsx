import SpinnerSVG from '~/assets/spinner.svg';

export default function Spinner() {
  return (
    <div class="has-text-centered">
      <img src={SpinnerSVG} alt="Loading" />
    </div>
  );
}
