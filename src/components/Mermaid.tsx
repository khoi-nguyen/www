import mermaid from 'mermaid';

interface MermaidProps {
  children: string;
}

export default function Mermaid(props: MermaidProps) {
  mermaid.initialize({ startOnLoad: false });
  const [svg, setSvg] = createSignal('');

  createEffect(async () => {
    const svg = await mermaid.render('graphDiv', String(props.children));
    setSvg(svg.svg);
  });

  return <div class="has-text-centered block" innerHTML={svg()} />;
}
