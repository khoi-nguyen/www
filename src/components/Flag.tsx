import { US, FR } from 'country-flag-icons/string/3x2';

const flags = {
  en: US,
  fr: FR,
};

interface FlagProps {
  country?: string;
  lang: 'en' | 'fr';
}

export default function Flag(props: FlagProps) {
  const flag = () => {
    if (props.country) {
      return props.country;
    }
    return flags[props.lang];
  };
  return <span class="icon" innerHTML={flag()} />;
}
