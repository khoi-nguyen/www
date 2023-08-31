import mermaid from 'mermaid';

interface MermaidProps {
  children: string;
  scale?: number;
}

export default function Mermaid(props: MermaidProps) {
  props = mergeProps({ scale: 1 }, props);
  mermaid.initialize({ startOnLoad: false });
  const [svg, setSvg] = createSignal('');

  createEffect(async () => {
    const svg = await mermaid.render('graphDiv', String(props.children));
    setSvg(svg.svg);
  });

  return (
    <div class="has-text-centered block">
      <div innerHTML={svg()} style={{ zoom: props.scale }} />
    </div>
  );
}
