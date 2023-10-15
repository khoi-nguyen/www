import meta from './index.json';

export default () => {
  const location = useLocation();
  return (
    <Page meta={meta}>
      <h2>Informations pratiques</h2>
      <dl>
        <dt>Objectifs</dt>
        <dd>
          Rappel des notions du cours de mathématiques 6h du secondaire qui vous seront utiles
        </dd>
        <dt>Théorie</dt>
        <dd>NGUYEN Khoi (NGY)</dd>
        <dt>Exercices</dt>
        <dd>
          ANNENKOFF David (ANN), GUERRIERI Rolando (R5G), JOLY Marius (MJ5), MARCHAL Jonas (JM5),
          NGUYEN Khoi (NGY)
        </dd>
        <dt>Resources</dt>
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
      <h2>Resources</h2>
      <Explorer pattern={`${location.pathname}/?[0-9a-z]+-.*json$`} showPDF />
    </Page>
  );
};
