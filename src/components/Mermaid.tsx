import mermaid from 'mermaid'

interface MermaidProps {
  children: string | string[]
}

export default function Mermaid(props: MermaidProps) {
  let element: HTMLPreElement
  const c = children(() => props.children)
  const [svg] = createResource(c(), async (children): Promise<string> => {
    const code = String(children)
    const { svg } = await mermaid.render('graphDiv', code)
    return svg
  })

  return (
    <pre ref={element!} innerHTML={svg()}>
      {props.children}
    </pre>
  )
}
