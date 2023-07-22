export const meta = {
  title: 'Algorithms',
  subtitle: 'NYU/CS-UY 2413 (Fall 2023)',
  description: 'An introduction to classical algorithms for computer science students',
};

export default () => {
  const location = useLocation();
  return (
    <Page meta={meta}>
      <h2>Practical information</h2>
      <dl>
        <dt>Email</dt>
        <dd>
          <a href="mailto:nguyen.khoi@nyu.edu">nguyen.khoi@nyu.edu</a>
        </dd>
        <dt>Lectures</dt>
        <dd>
          <ul>
            <li>Tuesday 17:45-19:00, 19:15-20:00</li>
            <li>Thursday 17:45-19:00, 19:15-20:00</li>
          </ul>
        </dd>
        <dt>Office Hour</dt>
        <dd>TBD</dd>
      </dl>
      <h2>Teaching resources</h2>
      <Explorer pattern={`${location.pathname}/?[0-9]+-.*tsx$`} />
    </Page>
  );
};
