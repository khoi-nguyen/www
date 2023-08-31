import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
import {
  faBook,
  faCircleQuestion,
  faInfoCircle,
  faPen,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons/index.js';
import { langSignal } from '~/root';

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
          {(icon) => (
            <>
              <Fa icon={icon()} />{' '}
            </>
          )}
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
  const [lang] = langSignal;
  const name = () => (lang() === 'fr' ? 'Corollaire' : 'Corollary');
  return <Environment name={name()} icon={faBook} {...props} />;
}

export function Definition(props: SpecificEnvironmentProps) {
  const [lang] = langSignal;
  const name = () => (lang() === 'fr' ? 'Définition' : 'Definition');
  return <Environment name={name()} icon={faBook} {...props} />;
}

export function Example(props: SpecificEnvironmentProps) {
  const [lang] = langSignal;
  const name = () => (lang() === 'fr' ? 'Exemple' : 'Example');
  return <Environment name={name()} icon={faPen} {...props} />;
}

export function Exercise(props: SpecificEnvironmentProps) {
  const [lang] = langSignal;
  const name = () => (lang() === 'fr' ? 'Exercice' : 'Exercise');
  return <Environment name={name()} icon={faPenToSquare} {...props} />;
}

export function Information(props: SpecificEnvironmentProps) {
  return <Environment name="Information" icon={faInfoCircle} {...props} />;
}

export function Proposition(props: SpecificEnvironmentProps) {
  return <Environment name="Proposition" icon={faBook} {...props} />;
}

export function Remark(props: SpecificEnvironmentProps) {
  const [lang] = langSignal;
  const name = () => (lang() === 'fr' ? 'Remarque' : 'Remark');
  return <Environment name={name()} icon={faBook} {...props} />;
}

export function Question(props: SpecificEnvironmentProps) {
  return <Environment name="Question" icon={faCircleQuestion} {...props} />;
}

export function Theorem(props: SpecificEnvironmentProps) {
  const [lang] = langSignal;
  const name = () => (lang() === 'fr' ? 'Théorème' : 'Theorem');
  return <Environment name={name()} icon={faBook} {...props} />;
}
