const meta: Metadata = {
  title: 'Architecture de composants',
  subtitle: 'Labo 1',
  lang: 'fr',
  description: 'Composants, état',
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
    <Slideshow meta={meta}>
      <Slide title="Installer NPM">
        <Iframe src="https://nodejs.org" height={600} />
        <Instruction pluralize>
          <ul>
            <li>
              Allez sur le site web the <strong>nodejs</strong>:{' '}
              <a href="https://nodejs.org">http://nodejs.org</a>
            </li>
            <li>
              Téléchargez la version appropriée pour votre machine (la version <Abbr key="LTS" />{' '}
              suffit, il n'est pas nécéssaire de prendre la toute dernière version)
            </li>
          </ul>
        </Instruction>
      </Slide>
      <Slide title="Créer un projet Svelte">
        <Instruction>
          <ul>
            <li>Ouvrez le terminal</li>
            <li>
              Executez la commande: <code>npm create vite@latest</code> avec les options ci-dessous
              (vous pouvez appeler le projet comme vous le voulez):
              <Figure src="svelte-vite-setup.png" alt="Screenshot of npm create vite" />
            </li>
            <li>
              Exécutez ensuite les commandes suivantes:
              <Editor lang="bash">
                {dedent`
                  cd <nom-du-projet>
                  npm install
                  npm run dev
                `}
              </Editor>
            </li>
          </ul>
        </Instruction>
      </Slide>
    </Slideshow>
  )
}
