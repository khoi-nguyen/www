import meta from './index.json';

export default () => {
  const location = useLocation();
  return (
    <Page meta={meta}>
      <h2>Ressources</h2>
      <Explorer pattern={`${location.pathname}/?[0-9a-z]+-.*json$`} showPDF />
      <div class="columns">
        <div>
          <h2>Informations pratiques</h2>
          <dl>
            <dt>Théorie</dt>
            <dd>NGUYEN Khoi (NGY)</dd>
            <dt>Labos</dt>
            <dd>LURKIN Quentin (LUR), NGUYEN Khoi (NGY)</dd>
            <dt>Local</dt>
            <dd>1E04</dd>
          </dl>
        </div>
        <div>
          <Calendar filter={(event) => event.title.startsWith('AW4C')} />
        </div>
      </div>
    </Page>
  );
};
