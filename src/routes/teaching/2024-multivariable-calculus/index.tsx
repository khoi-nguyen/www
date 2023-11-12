import meta from './index.json';

export default () => {
  const location = useLocation();
  return (
    <Page meta={meta}>
      <h2>Informations pratiques</h2>
      <dl>
        <dt>Théorie</dt>
        <dd>NGUYEN Khoi (NGY)</dd>
        <dt>Exercices</dt>
        <dd>HILLEWAERE Ruben (HIL), JONAS-SZATANSKI Jacek (JSZ), NGUYEN Khoi (NGY)</dd>
        <dt>Ressources</dt>
        <dd>
          <ul>
            <li>
              <Cite key="stewart" reference />
            </li>
            <li>
              Slides annotés sur mon site web: <A href="/">https://nguyen.me.uk</A>
            </li>
          </ul>
        </dd>
      </dl>
      <Explorer pattern={`${location.pathname}/?[0-9a-z]+-.*json$`} showPDF />
    </Page>
  );
};
