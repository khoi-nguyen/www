import meta from './index.json';

export default () => {
  const location = useLocation();
  return (
    <Page meta={meta}>
      <h2>Practical information</h2>
      <Explorer pattern={`${location.pathname}/?[0-9a-z]+-.*json$`} showPDF />
    </Page>
  );
};
