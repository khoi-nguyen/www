interface MermaidProps {
  children: string | string[]
}

export default function Mermaid(props: MermaidProps) {
  let element: HTMLPreElement
  const c = children(() => props.children)
  const [svg, setSvg] = createSignal('')

  onMount(async () => {
    const mermaid = (await import('mermaid')).default
    const code = String(c())
    const { svg } = await mermaid.render('graphDiv', code)
    setSvg(svg)
  })

  return (
    <pre ref={element!} innerHTML={svg()}>
      {props.children}
    </pre>
  )
}
