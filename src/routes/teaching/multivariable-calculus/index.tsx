import { EventImpl } from '@fullcalendar/core/internal'

const meta: Metadata = {
  title: 'Outils mathématiques',
  subtitle: 'ECAM/EM1C-T1 (Q2)',
  lang: 'fr',
  description: 'Calcul différentiel et intégral à plusieurs variables',
  current: true,
  split: true,
}

function changeEvent(event: EventImpl) {
  const type = event.title.indexOf('-T1-') > -1 ? 'Cours théorique' : 'Exercices'
  const group = event.title.indexOf('1BA-A') > -1 ? 'A' : 'B'
  event.setProp('title', `${type} [${group}]`)
}

export default () => {
  const location = useLocation()
  return (
    <Page meta={meta}>
      <h2>Cours théoriques</h2>
      <Explorer pattern={`${location.pathname}/?[0-9a-z]+-.*[a-z].*json$`} showPDF />
      <h2>Séances d'exercices</h2>
      <Explorer pattern={`${location.pathname}/?ex`} showPDF />
      <div class="columns">
        <div>
          <h2>Informations pratiques</h2>
          <dl>
            <dt>Théorie</dt>
            <dd>NGUYEN Khoi (NGY)</dd>
            <dt>Exercices</dt>
            <dd>GUERRIERI Rolando (R5G), JONAS-SZATANSKI Jacek (JSZ), NGUYEN Khoi (NGY)</dd>
            <dt>Ressources</dt>
            <dd>
              <ul>
                <li>
                  <Cite key="stewart" reference />
                </li>
                <li>
                  Slides annotés sur mon site web: <A href="/">https://nguyen.me.uk</A>
                </li>
              </ul>
            </dd>
          </dl>
        </div>
        <div>
          <Calendar
            changeEvent={changeEvent}
            filter={(event) => event.title.startsWith('EM1C')}
            initialView="listWeek"
            showLocation
          />
        </div>
      </div>
    </Page>
  )
}
