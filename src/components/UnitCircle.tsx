interface UnitCircleProps {
  angle?: number;
  label?: string;
  scale?: number;
}

const tr = (x: number, axis: 'x' | 'y' = 'x') => {
  return 110 + (axis === 'x' ? 1 : -1) * x * 100;
};

export default function UnitCircle(props: UnitCircleProps) {
  const radius = 100;
  const point = () => [tr(Math.cos(props.angle || 0)), tr(Math.sin(props.angle || 0), 'y')];
  return (
    <div class="has-text-centered">
      <svg viewBox="0 0 220 220" width={500 * (props.scale || 1)}>
        <circle cx={tr(0)} cy={tr(0)} fill="none" r={radius} stroke-width={2} stroke="black" />
        <line x1={tr(-1)} y1={tr(0)} x2={tr(1)} y2={tr(0)} stroke="black" stroke-width={2} />
        <line x1={tr(0)} y1={tr(-1)} x2={tr(0)} y2={tr(1)} stroke="black" stroke-width={2} />
        <Show when={props.angle}>
          <circle cx={point()[0]} cy={point()[1]} r={3} />
          <line
            x1={tr(0)}
            y1={tr(0)}
            x2={point()[0]}
            y2={point()[1]}
            stroke="black"
            stroke-dasharray="2"
          />
          <line
            x1={tr(0)}
            y1={point()[1]}
            x2={point()[0]}
            y2={point()[1]}
            stroke="black"
            stroke-dasharray="2"
          />
          <line
            x1={point()[0]}
            y1={tr(0)}
            x2={point()[0]}
            y2={point()[1]}
            stroke="black"
            stroke-dasharray="2"
          />
        </Show>
      </svg>
    </div>
  );
}
