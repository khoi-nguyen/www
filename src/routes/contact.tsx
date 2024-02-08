import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import type { EventImpl } from '@fullcalendar/core/internal'

const meta: Metadata = {
  title: 'Contact me',
  description: 'How to contact me',
}

interface EmailProps {
  address: string
}

function Email(props: EmailProps) {
  return (
    <a href={'mailto:' + props.address}>
      <Fa icon={faEnvelope} /> {props.address}
    </a>
  )
}

function changeEvent(event: EventImpl) {
  let title = event.title
  const titles = {
    'AW4C-T1-4MBA-A': 'Web Architecture (BA)',
    'AW4C-L1-4MBA-A': 'Web Architecture (BA, Labo)',
    'AW4L-L1-4MIN': 'Web Architecture (IN)',
    'EM1C-T1-1BA-A': 'Outils maths A',
    'EM1C-T1-1BA-B': 'Outils maths B',
    'EM1C-X1-1BA-A': 'TP Outils maths A',
    'EM1C-X1-1BA-B': 'TP Outils maths B',
  }
  if (title in titles) {
    title = titles[title as keyof typeof titles]
  }
  const location = event.extendedProps.location
  if (location) {
    title += ` (${location})`
  }
  event.setProp('title', title)
}

export default () => (
  <Page meta={meta}>
    <h2>Contact info</h2>
    <dl>
      <dt>Email</dt>
      <dd>
        <ul>
          <li>
            <Abbr key="ECAM" />: <Email address="ngy@ecam.be" />
          </li>
          <li>
            <Abbr key="NYU" />: <Email address="nguyen.khoi@nyu.edu" />
          </li>
          <li>
            Personal: <Email address="khoi@nguyen.me.uk" />
          </li>
        </ul>
      </dd>
      <dt>Office</dt>
      <dd>
        <address>
          1E07
          <br />
          50 Promenade de l'Alma
          <br />
          Brussels 1200
          <br />
          BELGIUM
        </address>
      </dd>
    </dl>
    <h2>
      <Abbr key="ECAM" /> timetable
    </h2>
    <Calendar initialView="timeGridWeek" changeEvent={changeEvent} />
  </Page>
)
