import katex from '~/lib/katex';

interface MathsProps {
  display?: boolean;
  children?: JSX.Element;
  tex?: string;
}

export default function Maths(props: MathsProps) {
  const tex = () => String(props.tex ? props.tex : props.children);
  return <span innerHTML={katex(tex(), props.children ? true : props.display)} />;
}
