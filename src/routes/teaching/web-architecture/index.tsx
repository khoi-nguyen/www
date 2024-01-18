const meta: Metadata = {
  title: 'Web Architecture',
  subtitle: 'ECAM/AW4L-L1 (Q2)',
  lang: 'en',
  description: 'React, Next, OAuth and GraphQL',
  current: true,
}

export default () => {
  const location = useLocation()
  return (
    <Page meta={meta}>
      <h2>Resources</h2>
      <Explorer pattern={`${location.pathname}/?[0-9a-z]+-.*json$`} showPDF />
      <div class="columns">
        <div>
          <h2>Practical information</h2>
        </div>
        <div>
          <Calendar
            changeEvent={(event) => event.setProp('title', 'Web Architecture')}
            filter={(event) => event.title.startsWith('AW4L')}
            showLocation
          />
        </div>
      </div>
    </Page>
  )
}
