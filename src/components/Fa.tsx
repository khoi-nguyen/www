import type { IconDefinition } from '@fortawesome/fontawesome-common-types';

interface FaProps {
  icon: IconDefinition;
  color?: string;
}

export default function Fa(props: FaProps) {
  props = mergeProps({ color: 'black' }, props);
  const i = () => props.icon.icon;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${i()[0]} ${i()[1]}`}
      fill="currentColor"
      class="icon"
    >
      <path d={i()[4] as string} />
    </svg>
  );
}
