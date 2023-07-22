export const meta = {
  title: 'Numerical Analysis',
  subtitle: 'NYU/MATH-UA 9252 (Spring 2024)',
  description:
    'An introduction to numerical methods such as interpolation, integration and eigenvalue problems.',
};

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
      <Explorer pattern={`${location.pathname}[0-9]+-.*tsx$`} />
    </Page>
  );
};
