import meta from './cv.json';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBirthdayCake, faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons/index.js';

function calculateAge(dob: Date): number {
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  if (now < new Date(now.getFullYear(), dob.getMonth(), dob.getDate())) {
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
          <li>
            <Fa icon={faGithub} /> <a href="https://github.com/khoi-nguyen">khoi-nguyen</a>
          </li>
        </ul>
      </div>
    )}
    hideFooter
  >
    <h2>Education</h2>

    <CvLine
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
          Final essay on a Python/Typescript platform I wrote to generate exercises and mark the
          students' work
        </li>
      </ul>
    </CvLine>

    <CvLine
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
    </CvLine>

    <CvLine
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
    </CvLine>

    <h2>Experience</h2>

    <CvLine
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
    </CvLine>

    <CvLine
      title="Lecturer in Mathematics and Computer Science"
      employer={<a href="https://nyu.edu">New York University</a>}
      location="Paris"
      dates={[new Date('2023-01')]}
    >
      <ul>
        <li>Taught courses: Numerical Analysis, Algorithms</li>
        <li>Programming languages used: Python, Julia</li>
      </ul>
    </CvLine>

    <CvLine
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
    </CvLine>

    <CvLine
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
    </CvLine>

    <CvLine
      title="Teacher of Mathematics"
      employer={
        <a href="https://www.federation-wallonie-bruxelles.be/">Féderation Wallonie-Bruxelles</a>
      }
      dates={[new Date('2017-01'), new Date('2019-06')]}
    >
      <ul>
        <li>Language of instruction: French</li>
      </ul>
    </CvLine>

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
