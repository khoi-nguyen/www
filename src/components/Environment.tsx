import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
import {
  faBook,
  faCircleQuestion,
  faPen,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons/index.js';

interface SpecificEnvironmentProps {
  children?: JSX.Element;
  icon?: IconDefinition;
  title?: string | (() => JSX.Element);
}

interface EnvironmentProps extends SpecificEnvironmentProps {
  name: string;
}

export function Environment(props: EnvironmentProps) {
  return (
    <div class="environment">
      <h3 class={props.name.toLowerCase()}>
        <Show when={props.icon}>
          <Fa icon={props.icon!} />{' '}
        </Show>
        {props.name}
        <Show when={props.title}>
          {' '}
          ({typeof props.title === 'function' ? props.title() : props.title})
        </Show>
      </h3>
      <div>{props.children}</div>
    </div>
  );
}

export function Corollary(props: SpecificEnvironmentProps) {
  return <Environment name="Corollary" icon={faBook} {...props} />;
}

export function Definition(props: SpecificEnvironmentProps) {
  return <Environment name="Definition" icon={faBook} {...props} />;
}

export function Example(props: SpecificEnvironmentProps) {
  return <Environment name="Example" icon={faPen} {...props} />;
}

export function Exercise(props: SpecificEnvironmentProps) {
  return <Environment name="Exercise" icon={faPenToSquare} {...props} />;
}

export function Proposition(props: SpecificEnvironmentProps) {
  return <Environment name="Proposition" icon={faBook} {...props} />;
}

export function Remark(props: SpecificEnvironmentProps) {
  return <Environment name="Remark" icon={faBook} {...props} />;
}

export function Question(props: SpecificEnvironmentProps) {
  return <Environment name="Question" icon={faCircleQuestion} {...props} />;
}

export function Theorem(props: SpecificEnvironmentProps) {
  return <Environment name="Theorem" icon={faBook} {...props} />;
}
