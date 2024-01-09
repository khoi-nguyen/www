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

const Pokemon = svelte.raw`
  <script>
    export let name = ''
    export let hp = 100
    export let maxHealth = 100

    $: value = hp / maxHealth
  </script>

  <div>
    {name}<br />
    HP: <meter {value} low={0.1} /><br />
    {hp} / {maxHealth}
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
      <h2>
        Exercice 1: <Abbr key="CV" /> (composants purs)
      </h2>
      <p>
        Créez un composant <code>CVLine</code> et utilisez-le pour construire votre{' '}
        <Abbr key="CV" />. Faites-en sorte qu'il soit plus joli que l'exemple ci-dessous.
      </p>
      <Jupyter lang="svelte" modules={{ CVLine }} run columns>
        {svelte.raw`
          <h2>Expérience professionnelle</h2>

          <h2>Parcours académique</h2>

          <CVLine title="Doctorat en sciences de l'ingénieur" employer="ULB">
            <ul>
              <li>Thèse écrite avec Typst mais sans vim</li>
            </ul>
          </CVLine>
        `}
      </Jupyter>
      <h2>Exercice 2: Attrappez-les tous!</h2>
      <Jupyter lang="svelte" modules={{ Pokemon }} run columns>
        {svelte.raw`
          <script>
            let hp = 20
            let maxHealth = 416
            let caught = false
            let attempted = false

            function slap() {
              hp -= 5
            }

            function catchPokemon() {
              let p = 1 - hp / maxHealth
              if (Math.random() < p) {
                caught = true
              }
              attempted = true
            }

            function tryAgain() {
              hp = maxHealth
              caught = false
              attempted = false
            }
          </script>

          {#if caught}
            <p>The pokemon has been caught</p>
            <button on:click={tryAgain}>Try again</button>
          {:else}
            <Pokemon name="Mewtwo" maxHealth={maxHealth} hp={hp} />
            <button on:click={slap}>Slap</button>
            <button on:click={catchPokemon}>Catch</button>
            {#if attempted}
              <p>Oh no... the Pokemon broke free</p>
            {/if}
          {/if}
        `}
      </Jupyter>
    </Page>
  )
}
