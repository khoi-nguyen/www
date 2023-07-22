import SpinnerSVG from '~/assets/spinner.svg';

export default function Spinner() {
  return (
    <div style={{ 'text-align': 'center' }}>
      <img src={SpinnerSVG} alt="Loading" />
    </div>
  );
}
