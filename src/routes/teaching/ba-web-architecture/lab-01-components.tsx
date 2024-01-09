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

interface HealthProps {
  hp: number
  maxHealth: number
  name: string
}

function Health(props: HealthProps) {
  const value = () => props.hp / props.maxHealth
  return (
    <div>
      {props.name}
      <br />
      HP: <meter value={value()} low={0.1} />
      <br />
      {props.hp} / {props.maxHealth}
    </div>
  )
}

interface PokemonProps {
  showCatch?: boolean
}

function Pokemon(props: PokemonProps) {
  const maxHealth = 416
  const [hp, setHp] = createSignal(maxHealth)
  const [attempts, setAttempts] = createSignal(0)
  const [caught, setCaught] = createSignal(false)
  const slap = () => setHp(Math.max(hp() - 5, 0))
  const catchPokemon = () => {
    const p = 1 - hp() / maxHealth
    if (Math.random() < p) {
      setCaught(true)
    }
    setAttempts(attempts() + 1)
  }
  const reset = () => {
    setCaught(false)
    setAttempts(0)
    setHp(maxHealth)
  }
  return (
    <>
      <Show when={hp() > 0}>
        <Health name="Mewtwo" hp={hp()} maxHealth={maxHealth} />
        <Button onClick={slap}>Slap</Button>
      </Show>
      <Show when={props.showCatch && !caught()}>
        <Button onClick={catchPokemon}>Catch</Button>
      </Show>
      <Button onClick={reset}>Reset</Button>
      <Show when={attempts() > 0 && !caught()}>
        <p>
          The pokemon broke free {attempts()} time{attempts() > 1 ? 's' : ''}
        </p>
      </Show>
    </>
  )
}

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
      <h2>Exercice 2: Attrappez-les tous! (manipulation d'état et conditions)</h2>
      <ol>
        <li>
          <p>Créez un composant comme celui-ci:</p>{' '}
          <Health name="Mewtwo" maxHealth={416} hp={300} />
          <p>
            Il doit avoir les propriétés suivantes: <em>hp, maxHealth</em> et <em>name</em>. Lorsque
            le nombre de points de vie est bas, la couleur doit changer:
          </p>
          <Health name="Mewtwo" maxHealth={416} hp={25} />
          <p>
            <strong>Indication</strong>: utilisez la balise <code>&lt;meter /&gt;</code>
          </p>
        </li>
        <li>
          Employez ce composant et ajoutez un bouton qui permet de faire descendre le nombre de
          points de vie. <Pokemon />
        </li>
        <li>
          Ajouter un bouton pour attrapper le Pokemon. La probabilité que la Pokéball réussisse doit
          dépendre du nombre de PV. <Pokemon showCatch />
        </li>
      </ol>
    </Page>
  )
}
