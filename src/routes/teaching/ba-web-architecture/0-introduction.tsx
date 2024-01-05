import meta from './0-introduction.json'

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
              <li>
                <Abbr key="SSR" />
              </li>
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
      <Slide title="Motivations">
        <p>
          Le déroulement du cours et des labos sera planifié pour aborder et détailler les points
          suivants:
        </p>
        <Environment name="Thèmes centraux">
          <ul>
            <li>Le Web est une plateforme universelle</li>
            <li>Le Web a une architecture centralisée</li>
            <li>Créer une applications web est extrêmement complexe</li>
          </ul>
        </Environment>
      </Slide>
      <Slide
        title={() => (
          <>
            Rappels: <Abbr key="HTML" /> et <Abbr key="CSS" />
          </>
        )}
        split={false}
      >
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
        {jupyter({ lang: 'html', columns: true })`
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
      <Slide title="Javascript">
        <p>
          Le Javascript permet de changer la page sans la changer entièrement, ce qui permet une
          meilleure expérience pour l'utilisateur.
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
    </Slideshow>
  )
}
