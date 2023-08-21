import { Meta as SolidMeta, Title } from 'solid-start';

interface MetaProps {
  current?: boolean;
  adminOnly?: boolean;
  subtitle?: string;
  title: string;
  description: string;
}

export default function Meta(props: MetaProps) {
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
