import meta from './cv.json';
import {
  faBirthdayCake,
  faEnvelope,
  faGlobe,
  faPhone,
} from '@fortawesome/free-solid-svg-icons/index.js';

function calculateAge(dob: Date): number {
  const currentDate = new Date();
  const birthDate = new Date(dob);
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

export default () => (
  <Page meta={meta}>
    <ul class="cv-info">
      <li>
        <Fa icon={faBirthdayCake} /> {calculateAge(new Date('1991-01-24'))} years old
      </li>
      <li>
        <Fa icon={faPhone} /> +32 499 19 24 02
      </li>
      <li>
        <Fa icon={faEnvelope} /> <a href="mailto:khoi@nguyen.me.uk">khoi@nguyen.me.uk</a>
      </li>
      <li>
        <Fa icon={faGlobe} /> <A href="/">https://nguyen.me.uk</A>
      </li>
    </ul>

    <h2>Education</h2>

    <Line
      title={
        <>
          <Abbr key="PGCE" /> in Mathematics
        </>
      }
      employer={<a href="https://ox.ac.uk">University of Oxford</a>}
      dates={[new Date('2019-10'), new Date('2020-06')]}
    >
      <ul>
        <li>
          <strong>Funding:</strong> scholarship from the British government
        </li>
        <li>
          <strong>Extra-curricular:</strong> Half-blue for playing the Table Tennis Varsity match
          against Cambridge
        </li>
      </ul>
    </Line>

    <Line
      title={
        <>
          <Abbr key="PhD" /> in Mathematics
        </>
      }
      employer={<a href="https://imperial.ac.uk">Imperial College London</a>}
      dates={[new Date('2012-10'), new Date('2016-10')]}
    >
      <ul>
        <li>
          <strong>Thesis:</strong> Pseudo-Differential Calculus on Generalized Motion Groups
        </li>
        <li>
          <strong>Supervisor:</strong> Professor Michael Ruzhansky
        </li>
        <li>
          <strong>Funding:</strong> Competitive departmental scolarship
        </li>
      </ul>
    </Line>

    <Line
      title={
        <>
          <Abbr key="MASt" /> in Mathematics (Part III)
        </>
      }
      employer={<a href="https://cam.ac.uk">University of Cambridge</a>}
      dates={[new Date('2011-10'), new Date('2012-06')]}
    >
      <ul>
        <li>
          <strong>Thesis:</strong> Energy-minimizing maps
        </li>
        <li>
          <strong>Supervisor:</strong> Professor Neshan Wickramasekera
        </li>
        <li>
          <strong>Grade:</strong> distinction (highest passing grade)
        </li>
      </ul>
    </Line>

    <h2>Experience</h2>

    <Line
      title="Lecturer in Mathematics and Computer Science"
      employer={<a href="https://nyu.edu">New York University</a>}
      location="Paris"
      dates={[new Date('2023-01')]}
    >
      <ul>
        <li>
          <strong>Taught courses:</strong> Numerical Analysis, Algorithms
        </li>
        <li>
          <strong>Programming languages used:</strong> Python, Julia
        </li>
      </ul>
    </Line>

    <Line
      title="Lecturer in Mathematics"
      employer={<a href="https://ceastudyabroad.com/">CEA Study Abroad</a>}
      location="Paris"
      dates={[new Date('2023-05'), new Date('2023-06')]}
    >
      <ul>
        <li>
          <strong>Taught course:</strong> Differential Equations (for engineering students)
        </li>
      </ul>
    </Line>

    <Line
      title="Teacher of Mathematics and Computer Science"
      employer={<a href="https://britishschool.be">The British School of Brussels</a>}
      dates={[new Date('2021-08'), new Date('2023-01')]}
    >
      <ul>
        <li>
          <strong>Taught courses</strong>: <Abbr key="IGCSE" />, <Abbr key="IBDP" />, A Levels
        </li>
        <li>
          Supervision of <Abbr key="IBDP" /> Extended Essays
        </li>
        <li>Oxbridge entrance exams and mock interview preparation</li>
        <li>
          <strong>Extra-Curricular:</strong> First LEGO League
        </li>
      </ul>
    </Line>

    <Line
      title="Teacher of Mathematics and Computer Science"
      employer={
        <a href="https://www.kingscollegeschools.org">
          King's College, The British School of Madrid
        </a>
      }
      dates={[new Date('2020-08'), new Date('2021-08')]}
    >
      <ul>
        <li>
          <strong>Taught courses</strong>: <Abbr key="IGCSE" />, A Levels
        </li>
        <li>Oxbridge entrance exams and mock interview preparation</li>
      </ul>
    </Line>

    <Line
      title="Teacher of Mathematics"
      employer={
        <a href="https://www.federation-wallonie-bruxelles.be/">Féderation Wallonie-Bruxelles</a>
      }
      dates={[new Date('2017-01'), new Date('2020-06')]}
    />

    <h2>Skills</h2>

    <dl>
      <dt>Languages</dt>
      <dd>English (C2), French (C2), Spanish (C1)</dd>
      <dt>Programming</dt>
      <dd>TypeScript (React, Vue, Svelte), Python, Julia, PHP, SQL</dd>
      <dt>Typesetting</dt>
      <dd>{tex`\LaTeX`}, LibreOffice</dd>
    </dl>
  </Page>
);

interface LineProps {
  children?: JSX.Element;
  dates: Date[];
  employer: string | JSX.Element;
  location?: string | JSX.Element;
  title: string | JSX.Element;
}

function Line(props: LineProps) {
  const showDate = (date: Date) => {
    return date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
  };
  return (
    <div class="cv-line block">
      <hgroup>
        <h4>
          {props.title}, {props.employer} <Show when={props.location}>({props.location})</Show>
        </h4>
        <p>
          {props.dates.length === 1 && 'Since '}
          {props.dates.map(showDate).join(' — ')}
        </p>
      </hgroup>
      {props.children}
    </div>
  );
}
