import type { countries } from 'country-flag-icons';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';

const languages = {
  en: 'US',
  fr: 'FR',
} as const;

type FlagName = keyof typeof countries & string;
type FlagCode = FlagName | keyof typeof languages;

interface FlagProps {
  code: FlagCode;
}

export default function Flag(props: FlagProps) {
  const flag = () => {
    const code = languages.hasOwnProperty(props.code)
      ? languages[props.code as keyof typeof languages]
      : props.code;
    return getUnicodeFlagIcon(code);
  };
  return <span class="emoji">{flag()}</span>;
}
