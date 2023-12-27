import meta from './contact.json';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

interface EmailProps {
  address: string;
}

function Email(props: EmailProps) {
  return (
    <a href={'mailto:' + props.address}>
      <Fa icon={faEnvelope} /> {props.address}
    </a>
  );
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
      <dd>1E07</dd>
    </dl>
    <h2>
      <Abbr key="ECAM" /> timetable
    </h2>
    <Calendar initialView="timeGridWeek" />
  </Page>
);
