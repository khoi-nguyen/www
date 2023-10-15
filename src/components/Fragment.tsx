interface Attrs {
  class: string;
  'data-fragment-index'?: number;
}

interface FragmentProps {
  children: JSX.Element | JSX.Element[];
  index?: number;
  hideUntil?: Date;
}

export default function Fragment(props: FragmentProps) {
  const [admin] = useSession();
  const attrs: () => Attrs = () => {
    const newAttrs: Attrs = { class: 'fragment' };
    if (props.index) {
      newAttrs['data-fragment-index'] = props.index;
    }
    return newAttrs;
  };
  const showChildren = () => {
    if (!props.hideUntil) {
      return true;
    }
    return new Date() > props.hideUntil || admin();
  };
  return <div {...attrs()}>{showChildren() && props.children}</div>;
}
