const meta: Metadata = {
  title: 'Composants avec Svelte',
  subtitle: 'Labo 1',
  lang: 'fr',
  description: 'Architecture de composants',
  current: true,
}

const CVLine = svelte.raw`
  <script>
    export let title = ''
    export let employer = ''
  </script>

  <div>
    <h5>{title}, {employer}</h5>
    <slot />
  </div>
`

export default () => {
  return (
    <Page meta={meta}>
      <h2>Exercice 0: Installer NPM et svelte</h2>
      <ol>
        <li>
          Installez <a href="https://code.visualstudio.com/">Visual Studio Code</a>
        </li>
        <li>
          Allez sur le <a href="https://nodejs.org/en/">site de Node.js</a>.
        </li>
        <li>
          Téléchargez et installez la version LTS correspondante à votre système d'exploitation.
        </li>
        <li>
          Dans le terminal, lancez la commande <code>npm create svelte@latest my-app</code>
        </li>
      </ol>
      <h2>Exercice 1: composants purs</h2>
      <p>
        Créer un fichier <code>CVLine.svelte</code>
      </p>
      <Jupyter lang="svelte" modules={{ CVLine }}>
        {svelte.raw`
          <CVLine title="Master en sciences de l'ingénieur" employer="ULB">
            <ul>
              <li>Excellent en développement Web</li>
            </ul>
          </CVLine>
        `}
      </Jupyter>
      <h2>Exercice 2:</h2>
    </Page>
  )
}
