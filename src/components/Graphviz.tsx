import { instance } from '@viz-js/viz';

interface GraphvizProps {
  center?: boolean;
  children?: JSX.Element[] | JSX.Element[] | string;
}

export default function Graphviz(props: GraphvizProps) {
  props = mergeProps({ center: true }, props);
  const [svg, setSvg] = createSignal<SVGElement | undefined>(undefined);

  createEffect(async () => {
    const viz = await instance();
    setSvg(viz.renderSVGElement(String(props.children)));
  });

  return <div classList={{ 'has-text-centered': props.center }}>{svg()}</div>;
}
