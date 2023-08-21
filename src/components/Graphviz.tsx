import { instance } from '@viz-js/viz';

interface GraphvizProps {
  children?: JSX.Element[] | JSX.Element[] | string;
}

export default function Graphviz(props: GraphvizProps) {
  const [svg, setSvg] = createSignal<SVGElement | undefined>(undefined);

  createEffect(async () => {
    const viz = await instance();
    setSvg(viz.renderSVGElement(String(props.children)));
  });

  return <>{svg()}</>;
}
