const meta: Metadata = {
  title: 'Examen',
  description: '',
  lang: 'fr',
}

export default () => {
  return (
    <Page meta={meta}>
      <p>Cette liste n'est pas définitive!</p>
      <h2>Architecture de composants</h2>
      <ul>
        <li>
          Pourquoi est-il difficile pour les développeurs de gérer les mutations du{' '}
          <Abbr key="DOM" /> (sans framework)?
        </li>
        <li>Quels sont les avantages à employer un framework JavaScript?</li>
        <li>
          Dans <em>[situation donnée]</em>, cite les variables d'état nécéssaires pour
          l'implémentation
        </li>
      </ul>
      <h2>
        <Abbr key="HTTP" />, <Abbr key="MPA" />, <Abbr key="SPA" />, <Abbr key="SSR" />
        <ul>
          <li>
            Comment fonctionne l'
            <Abbr key="HTTPS" />? Utilise un diagramme de séquence pour illustrer ta réponse.
          </li>
          <li>
            Qu'est-ce qu'un cookie HTTP? Pourquoi sont-ils nécéssaires? Illustre avec un diagramme
            de séquence leur fonctionnement.
          </li>
          <li>Avec un diagramme de séquence, illustre le fonctionnement d'un site statique.</li>
          <li>
            Avec un diagramme de séquence, illustre le fonctionnement d'une <Abbr key="MPA" />.
          </li>
          <li>
            Avec un diagramme de séquence, illustre le fonctionnement d'une <Abbr key="SPA" />.
          </li>
          <li>
            Quels sont les avantages et les inconvénients d'une <Abbr key="SPA" />?
          </li>
          <li>
            Qu'est-ce que le <Abbr key="SSR" />?
          </li>
        </ul>
      </h2>
    </Page>
  )
}
