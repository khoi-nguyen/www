import { transpile } from '~/lib/transpile';

interface TranspileProps {
  code: string;
  onChange: () => void;
}

export default function Transpile(props: TranspileProps) {
  const tcode = () => transpile(props.code);
  createEffect(
    on(tcode, () => {
      props.onChange();
    }),
  );
  return <Editor lang="javascript" code={tcode()} />;
}
