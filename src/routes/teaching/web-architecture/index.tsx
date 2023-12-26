import meta from './index.json';

export default () => {
  const location = useLocation();
  return (
    <Page meta={meta}>
      <h2>Resources</h2>
      <Explorer pattern={`${location.pathname}/?[0-9a-z]+-.*json$`} showPDF />
      <h2>Practical information</h2>
      <div class="columns">
        <div>
          <h2>Informations pratiques</h2>
          <dl>
            <dt>Local</dt>
            <dd>1E04</dd>
          </dl>
        </div>
        <div>
          <Calendar filter={(event) => event.title.startsWith('AW4L')} />
        </div>
      </div>
    </Page>
  );
};
