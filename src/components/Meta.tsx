import { Meta as SolidMeta, Title } from 'solid-start';
import { langSignal } from '~/root';

interface MetaProps {
  adminOnly?: boolean;
  current?: boolean;
  lang?: string;
  subtitle?: string;
  title: string;
  description: string;
}

export default function Meta(props: MetaProps) {
  props = mergeProps({ lang: 'en' }, props);
  const [lang, setLang] = langSignal;
  createEffect(() => {
    if (props.lang !== lang() && props.lang) {
      setLang(props.lang);
    }
  });

  return (
    <>
      <Title>{props.title} - nguyen.me.uk</Title>
      <SolidMeta name="description" content={props.description} />
      <header>
        <h1>{props.title}</h1>
        {props.subtitle && <h2>{props.subtitle}</h2>}
      </header>
    </>
  );
}
