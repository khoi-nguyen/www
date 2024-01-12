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
      <h2>Practical information</h2>
      <div class="columns">
        <div>
          <h2>Informations pratiques</h2>
          <dl>
            <dt>Local</dt>
            <dd>1E04</dd>
          </dl>
          <dl>
            <dt>Nombres de sessions</dt>
            <dd>
              <ul>
                <li>6 blocs de deux cours</li>
                <li>5 labos</li>
              </ul>
            </dd>
          </dl>
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
