import type { IconDefinition } from '@fortawesome/fontawesome-common-types'
import {
  faBook,
  faCircleQuestion,
  faHistory,
  faImage,
  faInfoCircle,
  faLightbulb,
  faPen,
  faPenToSquare,
  faQuoteLeft,
  faScrewdriverWrench,
} from '@fortawesome/free-solid-svg-icons/index.js'
import { lang } from '~/lib/signals'

interface SpecificEnvironmentProps {
  children?: JSX.Element
  icon?: IconDefinition
  title?: string | (() => JSX.Element)
  pluralize?: boolean
}

interface EnvironmentProps extends SpecificEnvironmentProps {
  name: string
  class?: string
}

export function Environment(props: EnvironmentProps) {
  return (
    <div class="environment">
      <h3 class={props.class}>
        <Show when={props.icon}>
          {(icon) => (
            <>
              <Fa icon={icon()} />{' '}
            </>
          )}
        </Show>
        {props.name}
        <Show when={props.pluralize}>s</Show>
        <Show when={props.title}>
          {' '}
          ({typeof props.title === 'function' ? props.title() : props.title})
        </Show>
      </h3>
      <div>{props.children}</div>
    </div>
  )
}

export function Corollary(props: SpecificEnvironmentProps) {
  const name = () => (lang() === 'fr' ? 'Corollaire' : 'Corollary')
  return <Environment class="corollary" name={name()} icon={faBook} {...props} />
}

export function Definition(props: SpecificEnvironmentProps) {
  const name = () => (lang() === 'fr' ? 'Définition' : 'Definition')
  return <Environment class="definition" name={name()} icon={faBook} {...props} />
}

export function Example(props: SpecificEnvironmentProps) {
  const name = () => (lang() === 'fr' ? 'Exemple' : 'Example')
  return <Environment class="example" name={name()} icon={faPen} {...props} />
}

export function Exercise(props: SpecificEnvironmentProps) {
  const name = () => (lang() === 'fr' ? 'Exercice' : 'Exercise')
  return <Environment class="exercise" name={name()} icon={faPenToSquare} {...props} />
}

export function Idea(props: SpecificEnvironmentProps) {
  const name = () => (lang() === 'fr' ? 'Idée' : 'Idea')
  return <Environment class="idea" name={name()} icon={faLightbulb} {...props} />
}

export function Information(props: SpecificEnvironmentProps) {
  return <Environment class="information" name="Information" icon={faInfoCircle} {...props} />
}

export function Instruction(props: SpecificEnvironmentProps) {
  return (
    <Environment class="instruction" name="Instruction" icon={faScrewdriverWrench} {...props} />
  )
}

export function Interpretation(props: SpecificEnvironmentProps) {
  const name = () => (lang() === 'fr' ? 'Interprétation' : 'Interpretation')
  return <Environment class="interpretation" name={name()} icon={faImage} {...props} />
}

export function Problem(props: SpecificEnvironmentProps) {
  const name = () => (lang() === 'fr' ? 'Problème' : 'Problem')
  return <Environment class="problem" name={name()} icon={faBook} {...props} />
}

export function Proposition(props: SpecificEnvironmentProps) {
  return <Environment class="proposition" name="Proposition" icon={faBook} {...props} />
}

export function Recall(props: SpecificEnvironmentProps) {
  const name = () => (lang() === 'fr' ? 'Rappel' : 'Recall')
  return <Environment class="recall" name={name()} icon={faHistory} {...props} />
}

export function Remark(props: SpecificEnvironmentProps) {
  const name = () => (lang() === 'fr' ? 'Remarque' : 'Remark')
  return <Environment class="remark" name={name()} icon={faBook} {...props} />
}

export function Question(props: SpecificEnvironmentProps) {
  return <Environment class="question" name="Question" icon={faCircleQuestion} {...props} />
}

export function Quote(props: SpecificEnvironmentProps) {
  const name = () => (lang() === 'fr' ? 'Citation' : 'Quote')
  return <Environment class="quote" name={name()} icon={faQuoteLeft} {...props} />
}

export function Theorem(props: SpecificEnvironmentProps) {
  const name = () => (lang() === 'fr' ? 'Théorème' : 'Theorem')
  return <Environment class="theorem" name={name()} icon={faBook} {...props} />
}
