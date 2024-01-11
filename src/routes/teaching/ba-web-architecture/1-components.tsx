const meta: Metadata = {
  title: 'Architecture de composants',
  subtitle: 'Chapitre 2',
  lang: 'fr',
  description: 'Composants, état, état dérivé, cycle de vie',
}

const mutationsExample = (solve: boolean) => html.raw`
  <button onclick="addOne()">
    Count: <span id="counter">0</span>
  </button>
${html.if(solve)`
  <script>
    // État
    let count = 0

    function addOne() {
      // Changement d'état
      count = count + 1

      // Mutations du DOM
      document.getElementById('counter').innerText = count
    }
  </script>
`}
`

const coloredButtonExample = svelte.raw`
  <script>
    export let color = 'red'
    export let text = ''
    export let action
  </script>

  <button on:click={action} style={"background: " + color}>
    {text}
  </button>

  <style>
    button {
      color: white
    }
  </style>
`

const conditionsExample = svelte.raw`
`

const slotExample = svelte.raw`
  <script>
    export let color = 'red'
    export let action
  </script>

  <button on:click={action} style={"background: " + color}>
    <slot />
  </button>

  <style>
    button {
      color: white
    }
  </style>
`

export default () => {
  return (
    <Slideshow meta={meta}>
      <Slide title="Example: mutations">
        <Example>
          <p>
            Implémente <code>addOne</code>, qui augmente le compteur de 1 lorsque l'on clique sur le
            bouton.
          </p>
        </Example>
        <Jupyter lang="html" solution={mutationsExample} hideUntil={new Date('2024-01-13')} />
      </Slide>
      <Slide title="Mutations du DOM">
        <p>
          Sans utiliser les frameworks et les librairies modernes, la tâche la plus difficile en
          JavaScript est de{' '}
          <strong>
            synchroniser l'état et le <Abbr key="DOM" />.
          </strong>
        </p>
        <Question>
          <p>
            Pourquoi les modifications du <Abbr key="DOM" /> sont-elles difficiles?
          </p>
        </Question>
        <ul>
          <li>
            Robustesse: que faire quand l'
            <Abbr key="HTML" /> change?
          </li>
          <li>
            Encapsulation: comment être sûr que quelqu'un ne détruit pas quelque chose d'essentiel
            quelque part d'autre?
          </li>
          <li>Réusabilité: et si on voulait réutiliser certains éléments de l'interface?</li>
        </ul>
      </Slide>
      <Slide title="React: composants">
        <Figure src="react.svg" alt="Logo de React" height={250} />
        <p>
          En 2013, la librairie <strong>React</strong> (Facebook) introduit l'architecture des{' '}
          <strong>composants</strong>.
        </p>
        <Definition title="Définition">
          <p>
            Un composant est une unité de code contenant une pièce spécifique de fonctionalité ou d'
            <Abbr key="UI" />.
          </p>
        </Definition>
        <p>
          En des termes plus pratiques, pensez à une{' '}
          <strong>
            balise <Abbr key="HTML" />
          </strong>{' '}
          qui implémenterait du <Abbr key="HTML" />, du <Abbr key="CSS" /> et du JavaScript.
        </p>
        <Example title="Code de ce slide">
          {ts.hl`
            <Slide title="React: composants">
              <p>En 2013, la librairie...</p>
            </Slide>
          `}
        </Example>
      </Slide>
      <Slide title="Idée originale de React">
        <Idea>
          <p>
            <strong>Recréer entièrement</strong> une copie de l'interface à{' '}
            <strong>chaque changement</strong>, les comparer pour effectuer les changements
            nécéssaire minimaux.
          </p>
        </Idea>
        <Figure src="pokemon-battle.jpg" height={275} alt="Pokemon battle as UI example" />
        {react.hl`
          <div>
            {name} {gender}
            <span class="level">Lv{level}</span>
            <meter value={hp / totalHp} />
            {hp} / {totalHp}
          </div>
        `}
        <Remark>
          <p>
            Ceci nous permet d'écrire les <Abbr key="UI" /> de manière <strong>déclarative</strong>.
            Le programmeur ne doit s'occuper que de l'<strong>état</strong>.
          </p>
        </Remark>
      </Slide>
      <Slide
        title={() => (
          <>
            Virtual <Abbr key="DOM" />
          </>
        )}
      >
        <Figure src="virtual-dom.png" alt="Virtual DOM in React" height={500}>
          <p>
            React recrée l'interface à chaque changement d'état dans une copie (le virtual{' '}
            <Abbr key="DOM" />) et le compare au <Abbr key="DOM" /> du navigateur pour effectuer la
            mise à jour la plus petite possible).
          </p>
        </Figure>
        <Remark>
          <p>
            L'idée de base était de combiner la simplicité d'écrire une <Abbr key="UI" /> de zéro
            tout en gardant une certaine performance. Aujourd'hui, on se demande si le modèle limite
            un peu trop la performance.
          </p>
        </Remark>
      </Slide>
      <Slide title="React: exemple">
        {react.jupyter`
          function App() {
            console.log('Running App...')
            const [count, setCount] = useState(0)
            function addOne() {
              setCount(count + 1)
            }
            return (
              <button onClick={addOne}>
                Count: {count}
              </button>
            )
          }
        `}
      </Slide>
      <Slide title="Frameworks dominants">
        <p>Actuellement, les principaux frameworks sont</p>
        <ul>
          <li>
            <strong>
              <a href="https://react.dev">React</a>
            </strong>{' '}
            (Meta)
          </li>
          <li>
            <strong>
              <a href="https://angular.io">Angular</a>
            </strong>{' '}
            (Google)
          </li>
          <li>
            <strong>
              <a href="https://vuejs.org">Vue</a>
            </strong>
          </li>
        </ul>
        <Question>
          <p>Comment choisit-on un framework?</p>
        </Question>
        <p>En employant des critères tels que</p>
        <ul>
          <li>L'écosystème développé par les auteurs et la communauté</li>
          <li>La "simplicité"</li>
          <li>
            <Abbr key="JSX" />, <Abbr key="SFC" /> ou templates?
          </li>
          <li>Performance</li>
          <li>Compatibilité avec les outils</li>
          <li>Intégration avec le backend</li>
          <li>etc.</li>
        </ul>
      </Slide>
      <Slide title="State of Javascript 2022">
        <Iframe src="https://2022.stateofjs.com/en-US/libraries/front-end-frameworks/" />
      </Slide>
      <Slide title="Présentation de Svelte">
        <p>
          La plupart des concepts introduits par les frameworks sont les mêmes. Nous les
          introduiserons par Svelte. La spécificité est de fournir une <Abbr key="DX" /> similaire à
          React avec plus de performance car on n'emploie pas de Virtual <Abbr key="DOM" />.
        </p>
        <Figure src="svelte.svg" alt="Logo de svelte" height={250} />
        <dl>
          <dt>Auteur</dt>
          <dd>Rich Harris</dd>
          <dt>Première version</dt>
          <dd>Novembre 2016</dd>
          <dt>Version courante</dt>
          <dd>4.1.2</dd>
          <dt>License</dt>
          <dd>MIT</dd>
          <dt>Langage</dt>
          <dd>JavaScript</dd>
        </dl>
      </Slide>
      <Slide title="Un premier exemple: le compteur">
        <p>
          Svelte utilise le principe d'<strong>un composant par fichier</strong> (<Abbr key="SFC" />
          ), comme <a href="https://vuejs.org">Vue.js</a>. Imaginons que le fichier{' '}
          <code>Counter.svelte</code> contienne le code suivant:
        </p>
        <Jupyter lang="svelte">
          {svelte.raw`
            <script>
              let count = 0
              function addOne() {
                count = count + 1
              }
            </script>

            <button on:click={addOne}>
              Count: {count}
            </button>
          `}
        </Jupyter>
        <p>Vous pourrez réutiliser ce composant de la manière suivante:</p>
        {svelte.hl`
          <script>
            import Counter from './Counter.svelte'
          </script>

          <Counter />
        `}
      </Slide>
      <Slide title="Props">
        <p>Parfois vous voulez utiliser deux instances différentes du même composant.</p>
        {svelte.hl`
          <Pokemon name="Mewtwo" hp={300} maxHealth={416} />
          <Pokemon name="Pikachu" hp={150} maxHealth={211} />
        `}
        <Question>
          <p>
            Comment faire passer la propriété (prop) <code>name = 'Mewtwo'</code> au composant
            <code>Pokemon</code>?
          </p>
        </Question>
        <p>
          En Svelte: avec le mot clé <code>export</code>
        </p>
        {svelte.hl`
          <script>
            export let name // La valeur nous sera donnée en 'prop'
            export let hp = 100 // Valeur par défaut
            export let maxHealth = 100
          </script>

          {name}<br />
          HP: <meter value={hp / maxHealth} /><br />
          {hp} / {maxHealth}
        `}
      </Slide>
      <Slide title="Example: props" columns>
        <div>
          <h3>Button.svelte</h3>
          <Jupyter lang="svelte">{coloredButtonExample}</Jupyter>
        </div>
        <div>
          <h3>App.svelte (ou autre fichier)</h3>
          <Jupyter lang="svelte" modules={{ Button: coloredButtonExample }}>
            {svelte.raw`
              <Button 
                text="Bonjour"
                color="blue"
                action={function() { alert('hola') }}
              />

              <Button text="Hello" color="green" />
            `}
          </Jupyter>
        </div>
      </Slide>
      <Slide title="Affichage conditionnel">
        <p>
          Dans Svelte, on peut employer <code>{'{#if ...}'}</code>, <code>{'{:else if ...}'}</code>,{' '}
          <code>{'{:else}'}</code> et <code>{'{/if}'}</code> pour le rendu conditionnel.
        </p>
        {svelte.jupyter`
          <script>
            let count = 0
            function addOne() {
              count += 1
            }
          </script>

          <button on:click={addOne}>
            Count: {count}
          </button>
          {#if count > 10}
            <p>Le compteur a dépassé 10</p>
          {:else if count < 5}
            <p>Le compteur est en dessous de 5</p>
          {:else}
            <p>Le compteur est entre 5 et 10</p>
          {/if}
        `}
      </Slide>
      <Slide title="Slots" columns>
        <div>
          <p>
            La balise spéciale <code>slot</code> est remplacée par les enfants du composants.
          </p>
          <h3>Button.svelte</h3>
          <Jupyter lang="svelte">{slotExample}</Jupyter>
        </div>
        <div>
          <h3>App.svelte (ou autre fichier)</h3>
          <Jupyter lang="svelte" modules={{ Button: slotExample }}>
            {svelte.raw`
              <Button 
                text="Bonjour"
                color="blue"
                action={function() { alert('hola') }}
              >
                Hello <strong>world</strong>
              </Button>
            `}
          </Jupyter>
        </div>
      </Slide>
      <Slide title="Two-way binding">
        <p>
          Lorsque l'on travaille avec des formulaires, il est nécéssaire de pouvoir lier une
          variable et la valeur d'un champ de texte. En svelte, ça se fait via la directive{' '}
          <code>bind:value</code>.
        </p>
        {svelte.jupyter`
          <script>
            let name = ''
          </script>

          <p>What's your name?</p>
          <input bind:value={name} />

          {#if name}
            <p>Bonjour {name}</p>
          {/if}
        `}
      </Slide>
      <Slide title="Example: Formulaire">
        <Jupyter lang="svelte">
          {svelte.raw`
            <script>
              let password = ''
              let loggedIn = false
              function login() {
                if (password === 'secret') {
                  loggedIn = true
                }
              }
            </script>

            {#if !loggedIn}
              Password:
              <input type="password" bind:value={password} />
              <input type="submit" on:click={login} />
            {:else}
              <p>You've successfully logged in</p>
            {/if}
          `}
        </Jupyter>
      </Slide>
      <Slide title="État dérivé">
        <p>
          Dans Svelte, une assignation <strong>réactive</strong> est préfixée par <code>$:</code>.
          De telles quantités sont <strong>recalculées</strong> à chaque{' '}
          <strong>changement d'une dépendance</strong>.
        </p>
        {svelte.jupyter`
          <script>
            let grade = 20
            let total = 20
            $: percentage = grade / total * 100
          </script>

          Quelle note avez-vous obtenue à l'examen?
          <input type="int" bind:value={grade} />

          <p>Vous avez obtenu {percentage}%</p>

          {#if percentage < 50}
            <p>Rendez-vous en septembre</p>
          {/if}
        `}
      </Slide>
      <Slide title="Réactivité: exemple">
        {svelte.jupyter`
          <script>
            let birthDate = ''

            function calculateAge(birthDate) {
              const now = new Date()
              const dob = new Date(birthDate)
              let age = now.getFullYear() - dob.getFullYear()
              if (now < new Date(now.getFullYear(), dob.getMonth(), dob.getDate())) {
                age--
              }
              return age
            }

            $: age = calculateAge(birthDate)
          </script>

          <label>
            Date of birth: <input bind:value={birthDate} />
          </label>
          <p>You are {age} years old.</p>
        `}
      </Slide>
    </Slideshow>
  )
}
