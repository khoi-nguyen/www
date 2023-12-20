import getUnicodeFlagIcon from 'country-flag-icons/unicode';

const languages = {
  en: 'GB',
  fr: 'FR',
} as const;

interface FlagProps {
  code: string;
}

export default function Flag(props: FlagProps) {
  const flag = () => {
    const code = languages.hasOwnProperty(props.code)
      ? languages[props.code as keyof typeof languages]
      : props.code;
    return getUnicodeFlagIcon(code);
  };
  return <span>{flag()}</span>;
}
