import { US, FR } from 'country-flag-icons/string/3x2';

const flags = {
  en: US,
  fr: FR,
} as const;

interface FlagProps {
  country?: string;
  lang?: keyof typeof flags;
}

export default function Flag(props: FlagProps) {
  const flag = () => {
    if (props.country) {
      return props.country;
    } else if (props.lang) {
      return flags[props.lang];
    }
  };
  return <span class="icon" innerHTML={flag()} />;
}
