import meta from './index.json';

export default () => {
  const location = useLocation();
  return (
    <Page meta={meta}>
      <h2>Informations pratiques</h2>
      <dl>
        <dt>Email</dt>
        <dd>
          <a href="mailto:ngy@ecam.be">ngy@ecam.be</a>
        </dd>
      </dl>
      <h2>Resources</h2>
      <Explorer pattern={`${location.pathname}/?[0-9]+-.*json$`} />
    </Page>
  );
};
