const meta: Metadata = {
  title: 'Architecture de composants',
  subtitle: 'Chapitre 2',
  lang: 'fr',
  description: 'Composants, état, état dérivé, cycle de vie',
}

const mutationsExample = (solve: boolean) => html.raw`
  <button onclick="increaseCount()">
    Count: <span id="counter">0</span>
  </button>
${html.if(solve)`
  <script>
    // État
    let count = 0

    function increaseCount() {
      // Changement d'état
      count = count + 1

      // Mutations du DOM
      document.getElementById('counter').innerText = count
    }
  </script>
`}
`

export default () => {
  return (
    <Slideshow meta={meta}>
      <Slide title="Example: mutations">
        <Example>
          <p>
            Implémente <code>increaseCount</code>, qui augmente le compteur de 1 lorsque l'on clique
            sur le bouton.
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
      <Slide title="Ce que les frameworks ont en commun">
        <Example>
          {svelte.hl`
            <script>
              let title = ''
            </script>

            <section>
              <h1>{title}</h1>
              <slot />
            </section>
          `}
        </Example>
        <ul>
          <li>Syntaxe déclarative</li>
          <li>Composabilité</li>
        </ul>
      </Slide>
      <Slide title="Présentation de Svelte">
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
      <Slide title="Pourquoi Svelte?">
        <p>Svelte est relativement nouveau et moins établi que React, Angular ou Vue</p>
        <ul>
          <li>Syntaxe plus simple</li>
          <li>Idées sont les mêmes</li>
          <li></li>
        </ul>
      </Slide>
      <Slide title="Un premier exemple">
        <Jupyter lang="svelte">
          {svelte.raw`
            <script>
              let count = 0
              function increaseCount() {
                count = count + 1
              }
            </script>

            <button on:click={increaseCount}>
              Count: {count}
            </button>
          `}
        </Jupyter>
      </Slide>
      <Slide title="Formulaires">
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
      <Slide title="Réactivité">
        {svelte.jupyter`
          <script>
            let birthday = ''

            function calculateAge(birthday) {
              const now = new Date()
              const dob = new Date(birthday)
              return now.getFullYear() - dob.getFullYear()
            }

            $: age = calculateAge(birthday)
          </script>

          <label>
            Your birthday: <input bind:value={birthday} />
          </label>
          <p>You are {age} years old.</p>
        `}
      </Slide>
    </Slideshow>
  )
}
