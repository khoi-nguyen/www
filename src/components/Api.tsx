interface ApiProps {
  src: string
  lang?: 'json'
  method?: 'GET'
}

export default function Api(props: ApiProps) {
  props = mergeProps({ method: 'GET', lang: 'json' } as const, props)
  const [json] = createResource([props.src, props.method], async ([src, method]) => {
    if (src) {
      const res = await fetch(src, {
        method,
      })
      return JSON.stringify(await res.json(), null, 2)
    }
  })
  return (
    <>
      <dl>
        <dt>Endpoint</dt>
        <dd>
          <a href={props.src}>{props.src}</a>
        </dd>
        <dt>Method</dt>
        <dd>{props.method}</dd>
      </dl>
      <Editor lang={props.lang} code={json()} />
    </>
  )
}
