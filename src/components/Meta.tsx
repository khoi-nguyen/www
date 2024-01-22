import { Meta as SolidMeta, Title } from 'solid-start'
import { lang, setLang } from '~/lib/signals'

export interface Metadata {
  adminOnly?: boolean
  current?: boolean
  hideHeader?: boolean
  lang?: string
  subtitle?: string
  title: string
  description: string
  split?: boolean
}

export default function Meta(props: Metadata) {
  props = mergeProps({ lang: 'en' as const }, props)
  createEffect(() => {
    if (props.lang !== lang() && props.lang) {
      setLang(props.lang)
    }
  })

  return (
    <>
      <Title>{props.title} - nguyen.me.uk</Title>
      <SolidMeta name="description" content={props.description} />
      <Show when={!props.hideHeader}>
        <header>
          <h1>{props.title}</h1>
          {props.subtitle && <h2>{props.subtitle}</h2>}
        </header>
      </Show>
    </>
  )
}
