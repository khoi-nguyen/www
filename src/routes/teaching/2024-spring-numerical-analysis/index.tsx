import meta from './index.json';

export default () => {
  const location = useLocation();
  return (
    <Page meta={meta}>
      <h2>Practical information</h2>
      <dl>
        <dt>Email</dt>
        <dd>nguyen.khoi@nyu.edu</dd>
        <dt>Lectures</dt>
        <dd>TBD</dd>
        <dt>Office Hour</dt>
        <dd>TBD</dd>
      </dl>
      <Explorer pattern={`${location.pathname}[0-9]+-.*json$`} />
    </Page>
  );
};
