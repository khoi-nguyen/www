import meta from './0-introduction.json'

export default () => {
  return (
    <Slideshow meta={meta}>
      <Slide title="Slides" columns={true}>
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
      <Slide title="Contenu du cours">
        <ol>
          <li>Introduction</li>
          <li>
            <Abbr key="SPA" />
          </li>
        </ol>
      </Slide>
      <Slide
        title={() => (
          <>
            Rappels: <Abbr key="HTML" /> et <Abbr key="CSS" />
          </>
        )}
        split={false}
      >
        <Jupyter lang="html" columns>
          {dedent`
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
        </Jupyter>
      </Slide>
    </Slideshow>
  )
}
