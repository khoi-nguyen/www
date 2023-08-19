interface Attrs {
  class: string;
  'data-fragment-index'?: number;
}

interface FragmentProps {
  children: JSX.Element | JSX.Element[];
  index?: number;
}

export default function Fragment(props: FragmentProps) {
  const attrs: () => Attrs = () => {
    const newAttrs: Attrs = { class: 'fragment' };
    if (props.index) {
      newAttrs['data-fragment-index'] = props.index;
    }
    return newAttrs;
  };
  return <div {...attrs()}>{props.children}</div>;
}
