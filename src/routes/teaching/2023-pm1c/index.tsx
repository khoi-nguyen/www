import meta from './index.json';

export default () => {
  const location = useLocation();
  return (
    <Page meta={meta}>
      <h2>Informations pratiques</h2>
      <h2>Resources</h2>
      <Explorer pattern={`${location.pathname}/?[0-9]+-.*json$`} />
    </Page>
  );
};
