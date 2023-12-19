import meta from './cv.json';
import { faBirthdayCake, faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons/index.js';

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
  <Page
    meta={meta}
    header={(props) => (
      <div class="columns is-vcentered">
        <div class="is-8">{props.children}</div>
        <ul class="cv-info is-4">
          <li>
            <Fa icon={faBirthdayCake} /> {calculateAge(new Date('1991-01-24'))} years old
          </li>
          <li>
            <Fa icon={faEnvelope} /> <a href="mailto:khoi@nguyen.me.uk">khoi@nguyen.me.uk</a>
          </li>
          <li>
            <Fa icon={faGlobe} /> <A href="/">https://nguyen.me.uk</A>
          </li>
        </ul>
      </div>
    )}
  >
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
        <li>Funding: scholarship from the British government</li>
        <li>
          Extra-curricular: Half-blue for playing the Table Tennis Varsity match against Cambridge
        </li>
        <li>
          Final essay on a Python/Typescript platform I wrote to generate and mark mathematics
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
        <li>Thesis: Pseudo-Differential Calculus on Generalized Motion Groups</li>
        <li>
          Supervisor: Professor <a href="https://ruzhansky.org">Michael Ruzhansky</a>
        </li>
        <li>Funding: Competitive departmental scolarship</li>
      </ul>
    </Line>

    <Line
      title={
        <>
          <Abbr key="MASt" /> in Mathematics
        </>
      }
      employer={<a href="https://cam.ac.uk">University of Cambridge</a>}
      dates={[undefined, new Date('2012-06')]}
    >
      <ul>
        <li>Thesis: Energy-minimizing maps</li>
        <li>
          Supervisor: Professor{' '}
          <a href="https://www.maths.cam.ac.uk/person/ngw24">Neshan Wickramasekera</a>
        </li>
        <li>Grade: distinction (highest passing grade)</li>
        <li>
          Offered a <Abbr key="PhD" /> position based on academic performance
        </li>
      </ul>
    </Line>

    <h2>Experience</h2>

    <Line
      title="Lecturer in Mathematics and Computer Science"
      employer={
        <a href="https://ecam.be">
          <Abbr key="ECAM" />
        </a>
      }
      location="Brussels"
      dates={[new Date('2023-09')]}
    >
      <ul>
        <li>Taught courses: Calculus, Multivariable Calculus, Web Development</li>
        <li>Programming languages used: TypeScript, Python</li>
      </ul>
    </Line>

    <Line
      title="Lecturer in Mathematics and Computer Science"
      employer={<a href="https://nyu.edu">New York University</a>}
      location="Paris"
      dates={[new Date('2023-01')]}
    >
      <ul>
        <li>Taught courses: Numerical Analysis, Algorithms</li>
        <li>Programming languages used: Python, Julia</li>
      </ul>
    </Line>

    <Line
      title="Teacher of Mathematics and Computer Science"
      employer={<a href="https://britishschool.be">The British School of Brussels</a>}
      dates={[new Date('2021-08'), new Date('2023-01')]}
    >
      <ul>
        <li>
          Taught courses: <Abbr key="IGCSE" />, <Abbr key="IBDP" />, A Levels
        </li>
        <li>
          Supervision of <Abbr key="IBDP" /> Extended Essays in Mathematics and Computer Science
        </li>
        <li>Oxbridge entrance exams and mock interview preparation</li>
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
          Taught courses: <Abbr key="IGCSE" />, A Levels
        </li>
        <li>Oxbridge entrance exams and mock interview preparation</li>
      </ul>
    </Line>

    <Line
      title="Teacher of Mathematics"
      employer={
        <a href="https://www.federation-wallonie-bruxelles.be/">Féderation Wallonie-Bruxelles</a>
      }
      dates={[new Date('2017-01'), new Date('2019-06')]}
    >
      <ul>
        <li>Language of instruction: French</li>
      </ul>
    </Line>

    <h2>Skills</h2>

    <dl>
      <dt>Languages</dt>
      <dd>English (C2), French (C2), Spanish (C1), Vietnamese (A0)</dd>
      <dt>Programming</dt>
      <dd>
        TypeScript (React, Vue, Svelte, Solid), Python (numpy, scipy, sympy), Julia,{' '}
        <Abbr key="PHP" />, <Abbr key="SQL" />, GraphQL, Shell
      </dd>
      <dt>Typesetting</dt>
      <dd>{tex`\LaTeX`}, Typst</dd>
      <dt>Operating systems</dt>
      <dd>Linux</dd>
      <dt>Other tools</dt>
      <dd>Docker, vim</dd>
    </dl>
  </Page>
);

interface LineProps {
  children?: JSX.Element;
  dates: (Date | undefined)[];
  employer: string | JSX.Element;
  location?: string | JSX.Element;
  title: string | JSX.Element;
}

function Line(props: LineProps) {
  const showDate = (date?: Date) => {
    if (!date) {
      return;
    }
    return date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
  };
  return (
    <div class="cv-line block">
      <hgroup class="columns">
        <h4 class="is-8">
          {props.title}, {props.employer} <Show when={props.location}>({props.location})</Show>
        </h4>
        <p class="is-4">
          {props.dates.length === 1 && 'Since '}
          {props.dates
            .filter((x) => x !== undefined)
            .map(showDate)
            .join(' — ')}
        </p>
      </hgroup>
      {props.children}
    </div>
  );
}
