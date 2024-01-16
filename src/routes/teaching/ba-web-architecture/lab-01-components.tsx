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
    export let date = ''
  </script>

  <div>
    <h5>{title}, {employer} ({date})</h5>
    <slot />
  </div>
`

function SignUp() {
  const [email, setEmail] = createSignal('')
  const emailError = () => {
    if (!email()) {
      return ''
    }
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if (!regex.test(email())) {
      return 'The entered email address is not valid'
    }
    return ''
  }

  const [password, setPassword] = createSignal('')
  const [password2, setPassword2] = createSignal('')
  const passwordError = () => {
    if (!password() && !password2()) {
      return ''
    }
    if (password().length <= 5) {
      return 'The entered password must have at least 6 characters'
    }
    if (password() !== password2()) {
      return 'The passwords must match'
    }
  }

  return (
    <div class="block clickable">
      <p>
        Email: <input type="text" value={email()} onInput={(e) => setEmail(e.target.value)} />
      </p>
      <Show when={emailError()}>
        <p class="incorrect">{emailError()}</p>
      </Show>
      <p>
        Password:{' '}
        <input type="password" value={password()} onInput={(e) => setPassword(e.target.value)} />
      </p>
      <p>
        Enter your password again:{' '}
        <input type="password" value={password2()} onInput={(e) => setPassword2(e.target.value)} />
      </p>
      <Show when={passwordError()}>
        <p class="incorrect">{passwordError()}</p>
      </Show>
    </div>
  )
}

interface HealthProps {
  hp: number
  maxHealth: number
  name: string
}

function Health(props: HealthProps) {
  const value = () => props.hp / props.maxHealth
  return (
    <div class="block">
      {props.name}
      <br />
      HP: <meter value={value()} low={0.2} />
      <br />
      {props.hp} / {props.maxHealth}
    </div>
  )
}

function Pokemon() {
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
        <Show when={!caught()} fallback={<p>The Pokemon has been caught</p>}>
          <Health name="Mewtwo" hp={hp()} maxHealth={maxHealth} />
        </Show>
        <Button onClick={slap}>Slap</Button>
      </Show>
      <Show when={!caught()}>
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
          <ol>
            <li>
              Allez sur le site web the <strong>nodejs</strong>:{' '}
              <a href="https://nodejs.org">http://nodejs.org</a>
            </li>
            <li>
              Téléchargez la version appropriée pour votre machine (la version <Abbr key="LTS" />{' '}
              suffit, il n'est pas nécéssaire de prendre la toute dernière version)
            </li>
          </ol>
        </Instruction>
      </Slide>
      <Slide title="Créer un projet Svelte">
        <Instruction pluralize>
          <ol>
            <li>Ouvrez le terminal</li>
            <li>
              Executez la commande:
              <Editor lang="bash">{`npm create vite@latest`}</Editor>
              en veillant bien à sélectionner <strong>Svelte</strong> et <strong>JavaScript</strong>
              .
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
          </ol>
        </Instruction>
      </Slide>
      <Slide title="Création d'un premier composant">
        <Instruction>
          <ol>
            <li>
              Créez un fichier <code>src/lib/HelloWorld.svelte</code>
            </li>
            <li>
              Écrivez-y quelque chose comme
              {svelte.jupyter`
                <script>
                  let name = 'world'
                </script>
                <p>Hello {name}</p>
                <style>
                  p {
                    color: blue
                  }
                </style>
              `}
            </li>
            <li>
              Importez et utilisez le composant dans <code>src/App.svelte</code>:
              {svelte.hl`
              <script>
                import HelloWorld from './lib/HelloWorld.svelte'
              </script>

              <HelloWorld />
            `}
            </li>
          </ol>
        </Instruction>
      </Slide>
      <Slide
        title={() => (
          <>
            Exercice 1: <Abbr key="CV" />
          </>
        )}
        columns={true}
      >
        <Exercise>
          <p>
            Écrivez un composant <code>CvLine</code> qui vous permettra ensuite d'écrire votre{' '}
            <Abbr key="CV" />. Enjolivez-le avec du <Abbr key="CSS" />
          </p>
          <Jupyter lang="svelte" modules={{ CVLine }}>
            {svelte.raw`
              <h1>Curriculum Vitæ</h1>
              <h2>Parcours académique</h2>
              <CVLine 
                title="Master en mathématiques"
                employer="ECAM"
                date=""
              >
                <ul>
                  <li>Bonjour</li>
                </ul>
              </CVLine>
            `}
          </Jupyter>
        </Exercise>
        <div>
          <h3>Rappels</h3>
          {tex`
            \texttt{<}\overbrace{\texttt{CVLine}}^{\text{composant}}\,
            \overbrace{\texttt{title}}^{\text{prop}}=
            \texttt{value}\texttt{>}
            \underbrace{\dots}_{\text{slot}}
            \texttt{</CVLine>}
          `}
          <ul>
            <li>
              Les composants sont définis par un fichier <code>.svelte</code> dans{' '}
              <code>./src/lib/</code>
            </li>
            <li>
              Les props se déclarent dans le composant avec le mot clé <code>export</code>:
              {svelte.hl`
                <script>
                  export let title
                  // Ici, on donne une valeur par défaut
                  export let employer = 'ECAM'
                </script>
              `}
            </li>
            <li>
              Dans le composant, la balise <code>{html.raw`<slot />`}</code> indique où injecter le
              contenu du slot.
            </li>
          </ul>
        </div>
      </Slide>
      <Slide title="Exercice 2: Formulaires et Two-way data binding" columns>
        <div>
          <Exercise>
            <p>
              Implémentez un formulaire simplifié qui permet de créer un compte sur un site. Il doit
              vérifier les critères suivants:
            </p>
            <ul>
              <li>L'email entré doit être valide (utilisez ChatGPT pour cela)</li>
              <li>Les deux mots de passe doivent être identiques</li>
            </ul>
          </Exercise>
          <h4>Démo</h4>
          <SignUp />
        </div>
        <div>
          <h3>Rappels et indications</h3>
          <ul>
            <li>
              On peut <strong>lier</strong> une variable avec un champ via la directive{' '}
              <code>bind:</code>
              {svelte.hl`<input bind:value={variableName} />`}
            </li>
            <li>
              L'affichage conditionnel se fait avec <code>{'{#if ...}'}</code>,{' '}
              <code>{'{:else if ...}'}</code>, <code>{'{:else}'}</code> et <code>{'{/if}'}</code>
            </li>
          </ul>
          <h3>Quickstart</h3>
          {svelte.jupyter`
            <script>
              let email
            </script>

            <label>Email: <input bind:value={email} /></label>
            {#if !(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email))}
              <p class="error">
                L'email entrée n'est pas valide
              </p>
            {/if}

          `}
        </div>
      </Slide>
      <Slide title="Exercice 3: Pokemon">
        <div>
          <Exercise>
            <p>
              Implémentez une version simplifiée d'une bataille avec un Pokemon sauvage. Au plus le
              Pokemon a de PV, au plus il doit être difficile à capturer.
            </p>
          </Exercise>
          <Pokemon />
        </div>
      </Slide>
    </Slideshow>
  )
}
