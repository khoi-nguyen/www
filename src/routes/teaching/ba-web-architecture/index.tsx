const meta: Metadata = {
  title: 'Architecture Web (business analysts)',
  subtitle: 'ECAM/AW4C-4MBA (Q2)',
  lang: 'fr',
  description: 'SPA, MPA, SSR, REST, GraphQL',
  current: true,
}

export default () => {
  const location = useLocation()
  return (
    <Page meta={meta}>
      <h2>Cours théorique</h2>
      <Explorer pattern={`${location.pathname}/?[0-9a-z]{1,2}-.*json$`} showPDF />
      <h2>Labos</h2>
      <Explorer pattern={`${location.pathname}/?lab-[0-9a-z]+-.*json$`} showPDF />
      <div class="columns">
        <div>
          <h2>Informations pratiques</h2>
          <dl>
            <dt>Théorie</dt>
            <dd>NGUYEN Khoi (NGY)</dd>
            <dt>Labos</dt>
            <dd>LURKIN Quentin (LUR), NGUYEN Khoi (NGY)</dd>
            <dt>Local</dt>
            <dd>1E04</dd>
          </dl>
        </div>
        <div>
          <Calendar
            changeEvent={(event) => {
              let title = event.title.indexOf('-T1-') > -1 ? 'Cours théorique' : 'Labo'
              event.setProp('title', title)
            }}
            filter={(event) => event.title.startsWith('AW4C')}
            showLocation
          />
        </div>
      </div>
    </Page>
  )
}
