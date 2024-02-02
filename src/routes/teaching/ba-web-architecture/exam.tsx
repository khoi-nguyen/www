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
    </Page>
  )
}
