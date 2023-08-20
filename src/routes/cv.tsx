import meta from './cv.json';

export default () => (
  <Page meta={meta}>
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
      </ul>
    </Line>

    <h2>Experience</h2>

    <Line
      title="Lecturer in Mathematics and Computer Science"
      employer={<a href="https://nyu.edu">New York University</a>}
      dates={[new Date('2023-01')]}
    >
      <ul>
        <li>
          <strong>Taught courses:</strong> Numerical Analysis, Algorithms
        </li>
      </ul>
    </Line>

    <Line
      title="Lecturer in Mathematics"
      employer={<a href="https://ceastudyabroad.com/">CEA Study Abroad</a>}
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
    />

    <Line
      title="Teacher of Mathematics and Computer Science"
      employer={
        <a href="https://www.kingscollegeschools.org">
          King's College, The British School of Madrid
        </a>
      }
      dates={[new Date('2020-08'), new Date('2021-08')]}
    />

    <Line
      title="Teacher of Mathematics"
      employer={
        <a href="https://www.federation-wallonie-bruxelles.be/">Féderation Wallonie-Bruxelles</a>
      }
      dates={[new Date('2017-01'), new Date('2020-06')]}
    />
  </Page>
);

interface LineProps {
  children?: JSX.Element;
  dates: Date[];
  employer: string | JSX.Element;
  title: string | JSX.Element;
}

function Line(props: LineProps) {
  const showDate = (date: Date) => {
    return date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
  };
  return (
    <div class="cv-line block">
      <hgroup>
        <h3>
          {props.title}, {props.employer}
        </h3>
        <p>
          {props.dates.length === 1 && 'Since '}
          {props.dates.map(showDate).join(' — ')}
        </p>
      </hgroup>
      {props.children}
    </div>
  );
}
