interface ButtonProps {
  children?: JSX.Element | JSX.Element[];
  onClick?: (event: MouseEvent) => void;
}

export default function Button(props: ButtonProps) {
  return (
    <>
      <button class="button" onClick={props.onClick}>
        {props.children}
      </button>
    </>
  );
}
