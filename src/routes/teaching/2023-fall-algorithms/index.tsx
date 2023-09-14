import meta from './index.json';

export const Info = () => (
  <dl>
    <dt>Lectures</dt>
    <dd>
      <ul>
        <li>Tuesday 17:45-19:00, 19:15-20:00</li>
        <li>Thursday 17:45-19:00, 19:15-20:00</li>
        <li>Lectures and recitations will be combined</li>
      </ul>
    </dd>
    <dt>Room</dt>
    <dd>406</dd>
    <dt>Resources</dt>
    <dd>
      <ul>
        <li>
          Annotated slides on <A href="/">https://nguyen.me.uk</A>
        </li>
        <li>
          <Cite key="clrs" reference />
        </li>
        <li>
          <Cite key="clrss" reference />
        </li>
      </ul>
    </dd>
    <dt>Email</dt>
    <dd>
      <a href="mailto:nguyen.khoi@nyu.edu">nguyen.khoi@nyu.edu</a>
    </dd>
    <dt>Office hour</dt>
    <dd>Wednesday 5:00pm (online)</dd>
    <dt>Evaluation</dt>
    <dd>
      <ul>
        <li>Homework: 50%</li>
        <li>Midterm: 25%</li>
        <li>Final: 25%</li>
      </ul>
    </dd>
    <dt>Useful documents</dt>
    <dd>
      <ul>
        <li>
          <A href="./syllabus">Syllabus</A>
        </li>
      </ul>
    </dd>
  </dl>
);

export default () => {
  const location = useLocation();
  return (
    <Page meta={meta}>
      <h2>Practical information</h2>
      <Info />
      <h2>Teaching resources</h2>
      <Explorer pattern={`${location.pathname}/?[0-9]+-.*json$`} showPDF />
    </Page>
  );
};
