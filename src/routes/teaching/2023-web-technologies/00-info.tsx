import meta from './00-info.json';

export default () => {
  return (
    <Slideshow meta={meta}>
      <Slide title="Aperçu">
        <p>Le web (côté client) repose sur les technologies suivantes</p>
        <dl>
          <dt>
            <Abbr key="HTML" />
          </dt>
          <dd>Décrit la sémantique</dd>
          <dt>
            <Abbr key="CSS" />
          </dt>
          <dd>
            Décrit l'<strong>apparence</strong> d'une page
          </dd>
          <dt>Javascript</dt>
          <dd>Langage de programmation</dd>
        </dl>
      </Slide>
      <Slide title="HTML">
        <Instruction>
          <p></p>
          <ul>
            <li>
              Créer un fichier avec l'extension <code>.html</code> et l'ouvrir avec Code.
            </li>
            <li>Pour voir le résultat, ouvrir le fichier avec votre navigateur.</li>
          </ul>
        </Instruction>
        {html`
          <!-- Ceci est un commentaire -->
          <h1>Ceci est un titre</h1>
          <h2>Ceci est un titre de niveau 2</h2>
          <p>Ceci est un paragraphe</p>
          <img src="chemin.png" alt="Texte alternatif" />
          <div>Ceci est un "bloc"</div>
          <a href="https://google.com">Lien</a>
        `}
      </Slide>
      <Slide title="HTML: références">
        <Iframe src="https://learnxinyminutes.com/docs/html/" />
      </Slide>
      <Slide title="Bases du CSS">
        <p>
          Nous verrons qu'il est nécéssaire de <strong>marquer</strong> une balise.
        </p>
        {html`
          <!-- Charger la feuille de style -->
          <link rel="stylesheet" href="style.css" />

          <p>Ce paragraphe est écrit en bleu</p>

          <p class="red">Ce paragraphe est rouge</p>
        `}
        {css`
          p {
            color: blue;
          }
          .red {
            color: red;
          }
        `}
      </Slide>
      <Slide title="Learn X in Y minutes">
        <Iframe src="https://learnxinyminutes.com/docs/css/" />
      </Slide>
      <Slide title="Javascript côté client">
        {html`
          <!-- Charger un fichier javascript -->
          <script src="fichier.js"></script>

          <script type="text/javascript">
            console.log('Hello world');
          </script>
        `}

        {js`
          console.log('Hello world')
          let button = document.querySelector("#button");
          button.addEventListener('click', function () {
            console.log('Le bouton a été cliqué');
          });
        `}
      </Slide>
      <Slide title="Learn X in Y minutes">
        <Iframe src="https://learnxinyminutes.com/docs/javascript/" />
      </Slide>
    </Slideshow>
  );
};
