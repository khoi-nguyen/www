import spinnerURL from '~/assets/spinner.svg?url'

const meta: Metadata = {
  title: 'Introduction',
  subtitle: 'Chapitre 1',
  lang: 'fr',
  description: 'Déroulement du cours, objectifs, rappels en HTML/CSS/JavaScript',
}

export default () => {
  return (
    <Slideshow meta={meta}>
      <Slide title="Contenu du cours (provisoire)">
        <ol>
          <li>
            Motivations, introduction et rappels
            <ul>
              <li>Pourquoi les technologies web sont-elles si importantes?</li>
              <li>
                <Abbr key="HTML" />, <Abbr key="CSS" /> et Javascript
              </li>
            </ul>
          </li>
          <li>
            Front-end
            <ul>
              <li>Architecture de composants</li>
              <li>Asynchronie</li>
              <li>
                <Abbr key="SPA" /> (avantages et inconvénients)
              </li>
            </ul>
          </li>
          <li>
            Back-end:
            <ul>
              <li>
                <Abbr key="ORM" />
              </li>
              <li>Authentification</li>
              <li>
                <Abbr key="REST" /> et GraphQL
              </li>
            </ul>
          </li>
          <li>Applications mobiles et desktop </li>
          <li>
            <Abbr key="UX" />, <Abbr key="DX" />
          </li>
          <li>State of the art</li>
        </ol>
      </Slide>
      <Slide title="Informations pratiques" columns={true}>
        <Iframe src="/teaching/" />
        <div>
          <Question>
            <p>Où trouver les slides?</p>
          </Question>
          <ul>
            <li>
              Allez sur mon site: <A href="/">https://nguyen.me.uk</A>
            </li>
            <li>Teaching &gt; Architecture Web (business analysts)</li>
          </ul>
          <Remark>
            <p>
              Ne pas confondre avec le cours d'architecture web pour les ingénieurs en informatique
            </p>
          </Remark>
        </div>
      </Slide>
      <Slide title="Attentes">
        <ul>
          <li>
            Les cours théoriques ne sont <strong>pas des cours de programmation</strong>. Je vous
            montrerai du code, mais l'objectif reste les concepts sous-jacents et non la syntaxe.
          </li>
          <li>
            Vous aurez l'occasion de "programmer" en labo. Vous pouvez utiliser l'intelligence
            artificielle, le but est de travailler votre compréhension des concepts.
          </li>
          <li>
            J'essayerai de <strong>communiquer clairement les attentes de l'examen</strong> durant
            le cours, mais également vers la fin du cours.
          </li>
        </ul>
      </Slide>
      <Slide title="Motivations">
        <p>
          Le déroulement du cours et des labos sera planifié pour aborder et détailler les points
          suivants:
        </p>
        <Environment name="Thèmes centraux">
          <ul>
            <li>Le web est une plateforme universelle</li>
            <li>Le web a une architecture centralisée</li>
            <li>Créer une application web est extrêmement complexe</li>
            <li>
              Demandes contradictoires (rapidité, <Abbr key="SEO" />, <Abbr key="UX" />,{' '}
              <Abbr key="DX" />
              ), etc.)
            </li>
          </ul>
        </Environment>
      </Slide>
      <Slide title="Que s'est-il passé?" columns>
        <Figure src="kardashian.png" alt="Screenshots of Kim Kardashian's instagram" width={1100}>
          <p>Captures d'écran de la page d'Instagram de Kim Kardashian au fil des années.</p>
        </Figure>
        <div>
          <p>
            <a href="https://archive.org">Wayback Machine</a> permet de voir un snapshot d'une page
            web au fil du temps.
          </p>
          <Question>
            <p>Que s'est-il passé en 2016 et en 2019?</p>
          </Question>
        </div>
      </Slide>
      <Slide title="Pourquoi une application web?">
        {/* Source: https://aws.amazon.com/what-is/web-application/ */}
        <Question>
          <p>Pourquoi développe-t-on des applications web?</p>
        </Question>
        <Fragment>
          <ul>
            <li>
              <strong>Accessibilité</strong> depuis n'importe quel type d'appareil, possibilité de
              partage et de coopération.
            </li>
            <li>
              <strong>Aisance de développement</strong>: relativement simple, multi-plateforme
            </li>
            <li>
              <strong>Simplicité pour l'utilisateur</strong>: pas d'installation, mises à jour
              automatiques, pas de maintenance côté utilisateur
            </li>
            <li>
              Architecture <strong>serveur/client</strong>
            </li>
          </ul>
        </Fragment>
      </Slide>
      <Slide title="The State of Developer Ecosystem 2023" columns>
        <Figure src="state-dev-ecosystem-2023.png" alt="Use of technologies over time" height={800}>
          <p>
            Graphe montrant l'utilisation des langages de programmation les plus populaires au fil
            des ans.
          </p>
        </Figure>
        <div>
          <Question>
            <p>
              Quelles sont les tendances principales au niveau du développement? Le développement
              web est-il en hausse ou en baisse?
            </p>
          </Question>
        </div>
      </Slide>
      <Slide title="Backend? Frontend?">
        <Figure src="frontend-backend.png" alt="Front-end vs. Back-end" />
      </Slide>
      <Slide title="Les protagonistes principaux de ce cours">
        <Figure src="frontend-languages.png" alt="HTML-CSS-JS" width="100%" />
        <dl>
          <dt>
            <Abbr key="HTML" />
          </dt>
          <dd>Métadonnées, contenu et structure de la page</dd>
          <dt>
            <Abbr key="CSS" />
          </dt>
          <dd>Apparence</dd>
          <dt>JavaScript</dt>
          <dd>
            <ul>
              <li>Comportement interactif (front-end)</li>
              <li>Communication frontend/backend après le rendu initial</li>
              <li>Communication avec les fichiers et base de données (back-end)</li>
            </ul>
          </dd>
        </dl>
      </Slide>
      <Slide
        title={() => (
          <>
            Rappels: <Abbr key="HTML" /> et <Abbr key="CSS" />
          </>
        )}
        split={false}
      >
        <p>
          Pour créer une page web, il suffit de créer un fichier texte <code>.html</code>
        </p>
        <h3>Liens utiles</h3>
        <ul>
          <li>
            <a href="https://developer.mozilla.org/en-US/docs/Web/HTML">
              Documentation <Abbr key="HTML" />
            </a>
          </li>
          <li>
            <a href="https://developer.mozilla.org/en-US/docs/Web/CSS">
              Documentation <Abbr key="CSS" />
            </a>
          </li>
        </ul>
        <h3>Exemple</h3>
        <Jupyter lang="html" columns>
          {html.raw`
            <h1>Ceci est un titre</h1>
            <p class="lead">Bonjour, ceci est un paragraphe</p>
            <p>Ceci est un autre paragraphe.</p>

            <style>
              h1 {
                color: red;
              }
              .lead {
                color: blue;
              }
            </style>
            <!-- Ou mieux <link href="..." /> -->
          `}
        </Jupyter>
        <p>
          <strong>Vocabulaire</strong>: balise, attribut, valeur, sélecteur
        </p>
      </Slide>
      <Slide title={() => <Abbr key="DOM" />}>
        <Definition title={() => <Abbr key="DOM" />}>
          <p>
            Le <Abbr key="DOM" /> est la représentation en mémoire d'une page <Abbr key="HTML" />.
          </p>
        </Definition>
        <Figure src="dom-and-html.png" alt="DOM representation of an HTML code" width="100%" />
        <Remark>
          <p>
            Vous pouvez voir le <Abbr key="DOM" /> d'une page avec les outils de développement (F12)
          </p>
        </Remark>
        <p>
          <strong>Vocabulaire</strong>: noeud, enfant, parent
        </p>
      </Slide>
      <Slide title="DOM Live Viewer">
        <Iframe src="https://software.hixie.ch/utilities/js/live-dom-viewer/" />
      </Slide>
      <Slide title="Modification du DOM post-chargement">
        <p>
          Il est possible de modifier le <Abbr key="DOM" /> manuellement. Je ne devrais probablement
          vous montrer cette astuce-là mais il est possible de lire les mots de passe sur les
          ordinateurs de vos amis...
        </p>
        <label class="clickable">
          Mot de passe super secret: <input type="password" value="bien essayé" />
        </label>
        <p>
          Généralement, les modifications du <Abbr key="DOM" /> se font en JavaScript. Dans
          l'exemple ci-dessous, cliquer sur le bouton "Play" introduit des changements du{' '}
          <Abbr key="DOM" />.
        </p>
        {py.jupyter`
          0.1 * 0.1
        `}
      </Slide>
      <Slide
        title={() => (
          <>
            Liens et <Abbr key="MPA" />
          </>
        )}
      >
        {html.jupyter`
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="https://wikipedia.org">Wikipedia</a></li>
            <li><a href="https://google.com">Google</a></li>
          </ul>
        `}
        <Remark>
          <p>
            Lorsque l'on clique sur un lien, le <Abbr key="DOM" /> est détruit et la nouvelle page
            est reconstruite de zéro.
          </p>
        </Remark>
      </Slide>
      <Slide title="JavaScript">
        <p>
          Le JavaScript permet de <em>partiellement</em> changer la page (plus précisément le{' '}
          <Abbr key="DOM" />
          ), ce qui permet une meilleure expérience pour l'utilisateur.
        </p>
        {html.jupyter`
          <h1 id="title">Bonjour</h3>
          <button id="button">Cliquez moi</button>

          <script>
            let button = document.getElementById('button')
            let title = document.getElementById('title')
            button.onclick = function() {
              title.innerHTML = '<em>Hello world</em>'
            }
          </script>
        `}
      </Slide>
      <Slide title="Exemple: publicité">
        {html.jupyter`
          <h1>Bienvenue sur mon site personnel</h1>
          <p>Pour récupérer les 5 euros que m'a coûté mon hébergeur,
          je vous rajoute une publicité et vous tracke avec Google.</p>

          <script>
            const ad = document.createElement('div')
            ad.innerHTML = '<p><em>Méchante publicité</em></p>'
            document.body.appendChild(ad)
          </script>
          <!--
            Souvent chargée de l'extérieur avec
            <script src="..."></script>
          -->
        `}
      </Slide>
      <Slide
        title={() => (
          <>
            Manipuler le <Abbr key="DOM" />
          </>
        )}
      >
        <ol>
          <li>
            Sélectionner le noeud
            {js.hl`
              let node = document.querySelector('.bonjour')
            `}
            <em>aussi:</em> getElementById, getElementsByClassNames, querySelectorAll, etc.
          </li>
          <li>
            Modification du noeud
            {js.hl`
              node.innerText = "Hello"
            `}
          </li>
          <li>
            Enlever un noeud
            {js.hl`
              node.remove()
            `}
          </li>
          <li>
            Ajouter un noeud:
            {js.hl`
              let parent = document.querySelector('...')
              parent.appendChild(node)
            `}
          </li>
        </ol>
        <Remark>
          <p>
            Il y a énormément de type de noeuds (e.g. un pour chaque balise) qui ont énormément de
            propriétés. Pour plus d'infos, consulter la{' '}
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model">
              documentation
            </a>
            .
          </p>
        </Remark>
      </Slide>
      <Slide title="Événements">
        <p>
          Une partie importante du Javascript est de réagir aux actions et interactions de
          l'utilisateur avec la page (scroll, clic sur un bouton, etc.)
        </p>
        {html.jupyter`
          <button>Clic!</button>
          <input />
          <span></span>

          <script>
            let button = document.querySelector('button')
            let input = document.querySelector('input')
            let span = document.querySelector('span')

            button.onclick = function() {
              alert('Clic')
            }
            input.onblur = function() {
              alert('Vous avez entré: ' + input.value)
            }
          </script>
        `}
      </Slide>
      <Slide title="Asynchronisme et le McDonalds" columns>
        <div>
          <h3>Asynchronisme</h3>
          <p>
            Dans le navigateur, le JavaScript se comporte comme un·e caissier·e du McDonalds lorsque
            les machines de commande sont en panne: les clients ne sont pas servis dans l'ordre.
          </p>
          <Figure src="mcdonalds-async.png" alt="Attente au McDonalds" width="600" />
          <p>
            Le modèle est plus complexe et requiert un peu de travail, mais au moins l'interface
            fonctionne quand on charge toujours les données.
          </p>
        </div>
        <div>
          <h3>Synchronisme</h3>
          <p>Le comportement par défaut est la file de supermarché</p>
          <Figure src="supermarket-queue.png" alt="Attente au McDonalds" width="600" />
          <p>
            Le modèle est <strong>plus simple</strong> mais on est bloqué si quelqu'un a oublié son
            portefeuille ou nourrit une famille de 15.
          </p>
        </div>
      </Slide>
      <Slide title="Asynchronisme: example" split={false}>
        <div class="columns">
          <ul>
            <li>
              <strong>async</strong>: cette fonction prendra du temps et la réponse ne sera pas
              immédiate
            </li>
            <li>
              <strong>await</strong>: quitte la file jusqu'à ce que la réponse soit disponible
            </li>
          </ul>
          <div />
        </div>
        <Jupyter lang="html" columns>
          {html.raw`
            <input />
            <img />
            <script>
              let input = document.querySelector('input')
              let img = document.querySelector('img')
              async function changePokemon(name) {
                img.src = '${spinnerURL}'
                const res = await fetch('https://pokeapi.co/api/v2/pokemon/' + name)
                const data = await res.json()
                img.src = data.sprites.other['official-artwork']['front_default']
              }
              input.onblur = function() {
                changePokemon(input.value)
              }
            </script>
          `}
        </Jupyter>
      </Slide>
      <Slide title="Réactivité (or lack thereof)">
        {ts.jupyter`
          let a = 2
          let b = 2 * a

          a = 5
        `}
        <Question>
          <p>
            À la fin du code, que vaut <code>b</code>?
          </p>
        </Question>
      </Slide>
    </Slideshow>
  )
}
