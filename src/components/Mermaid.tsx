import { createUniqueId } from 'solid-js'

interface MermaidProps {
  children: string | string[]
}

export default function Mermaid(props: MermaidProps) {
  let element: HTMLDivElement
  const c = children(() => props.children)
  const [svg, setSvg] = createSignal('')

  onMount(async () => {
    const mermaid = (await import('mermaid')).default
    const code = String(c())
    const { svg } = await mermaid.render(createUniqueId(), code)
    setSvg(svg)
  })

  return <div ref={element!} innerHTML={svg()} />
}