import katex from '~/lib/katex'

interface MathsProps {
  /** Inline or block formula */
  display?: boolean

  children?: JSX.Element

  /** LaTeX string to be rendered */
  tex?: string
}

export default function Maths(props: MathsProps) {
  const tex = () => String(props.tex ? props.tex : props.children)
  return <span innerHTML={katex(tex(), props.children ? true : props.display)} />
}
