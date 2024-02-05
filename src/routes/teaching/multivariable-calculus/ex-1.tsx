const meta: Metadata = {
  title: 'Séance 1',
  description: 'Séance 1',
  lang: 'fr',
}

export default function () {
  return (
    <Slideshow meta={meta}>
      <Slide title="Objectifs">
        <ul>
          <li>Esquisser le domaine d'une fonction à plusieurs variables</li>
          <li>Tracer les courbes de niveau</li>
          <li>Calculer des dérivées partielles</li>
          <li>Interpréter les dérivées partielles</li>
        </ul>
        <Remark>
          <p>
            Nous sommes conscient que vous n'avez pas eu de théorie et que l'horaire n'est pas
            idéal. Désolé.
          </p>
        </Remark>
      </Slide>
      <Slide title="Exercice 14.1.15">
        <Exercise>
          <p>Trouvez et esquissez le domaine de la fonction</p>
          {tex`
            \ln (9 - x^2 - 9y^2)
          `}
        </Exercise>
        <Recall title="Conditions d'existence">
          <p>L'intérieur d'un logarithme doit toujours être supérieur ou égal à {tex`0`}.</p>
        </Recall>
        <Recall title="Ellipse">
          <div class="columns">
            <div>
              <Figure src="ellipse.webp" width={500} alt="Ellispe" />
            </div>
            <div>
              {tex`
                \frac {x^2} {a^2} + \frac {y^2} {b^2} = 1
              `}
            </div>
          </div>
        </Recall>
      </Slide>
      <Slide title="Exercice 14.1.22">
        <Exercise>
          <p>Trouvez et esquissez le domaine de la fonction</p>
          {tex`
            \ln (16 - 4x^2 - 4y^2 - z^2)
          `}
        </Exercise>
      </Slide>
      <Slide title="Exercice 14.1.56">
        <Figure src="level-curves.png" alt="Courbes de niveau" height={350} />
        <Exercise>
          <p>
            Si {tex`V(x, y)`} est le potentiel électrique au point {tex`(x, y)`} dans le plan{' '}
            {tex`xy`}, alors les courbes de niveaux de {tex`V`} sont appelées les{' '}
            <strong>courbes équipotentielles</strong>, puisqu'en tous les points de ces courbes, le
            potentiel électrique est le même.
          </p>
          <p>Esquissez certaines courbes équipotentielles si</p>
          {tex`
            V(x, y) \defeq \frac {c} {\sqrt{r^2 - x^2 - y^2}},
          `}
          <p>où {tex`c`} est une constante positive.</p>
        </Exercise>
      </Slide>
      <Slide title="Exercice 14.3.28">
        <h4>Dérivées partielles premières</h4>
        <ul>
          <li>
            {tex`\partial_x, \frac {\partial} {\partial x}`}: dérivée par rapport à {tex`x`} et on
            traite les autres lettres <em>comme si elles étaient constantes</em>.
          </li>
          <li>
            {tex`\partial_y, \frac {\partial} {\partial y}`}: dérivée par rapport à {tex`y`} et on
            traite les autres lettres <em>comme si elles étaient constantes</em>.
          </li>
        </ul>
        <Exercise>
          <p>
            Calculer les <strong>dérivées partielles premières</strong> de la fonction
          </p>
          {tex`
            f(x, y) = x^y
          `}
        </Exercise>
        <Exercise title="14.3.62">
          <p>Calculez toutes les dérivées partielles secondes de la fonction</p>
          {tex`
            f(x, y) = \ln (x + 2y)
          `}
        </Exercise>
      </Slide>
      <Slide title="Interprétation des dérivées partielles">
        <p>
          Dérivée partielle = dérivée classique en se limitant dans une direction parallèle à un axe
        </p>
        <p>
          Notation: {tex`f_x = \partial_x f`}, {tex`f_y = \partial_y f`}
        </p>
        <Geogebra id="qp39qpnd" />
      </Slide>
      <Slide title="Exercice 14.3.74">
        <Figure src="14.4.74.png" alt="Exercice de courbes de niveau" />
        <Remark title="Piste de réflexions">
          <ul>
            <li>
              Lorsque l'on se déplace dans la direction {tex`x`}, est-ce que {tex`f`} croît-elle ou
              décroît-elle?
            </li>
          </ul>
        </Remark>
      </Slide>
      <Slide title="Exercice 14.3.99">
        <Example title="Exercice 14.3.47">
          <p>
            Utilisez la différentiation implicite pour trouver{' '}
            {tex`\frac {\partial z} {\partial x}`} et {tex`\frac {\partial z} {\partial y}`}
          </p>
          {tex`
            x^2 + 2y^2 + 3z^2 = 1
          `}
        </Example>
        <Exercise>
          <p>
            L'ellipsoïde {tex`4x^2 + 2y^2 + z^2 = 16`} intersecte le plan {tex`y = 2`} en une
            ellipse. Trouvez des équations paramétrique pour la tangente au point {tex`(1, 2, 2)`}
          </p>
        </Exercise>
      </Slide>
    </Slideshow>
  )
}
