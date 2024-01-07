const meta: Metadata = {
  title: 'Chapitre 5: Droites',
  description: 'Pente, équations vectorielles et cartésiennes',
  lang: 'fr',
}

export default () => {
  return (
    <Slideshow meta={meta}>
      <Slide title="Pente d'une droite">
        <Python>
          {py.raw`
            import matplotlib.pyplot as plt
            import numpy as np
            x = np.linspace(0, 5, 10)
            plt.plot(x, 2 * x + 1)
          `}
        </Python>
        <Definition title="Pente d'une droite">
          {tex`
            m = \frac {\Delta y} {\Delta x}
          `}
        </Definition>
        <Remark title="Pente et tangente">
          <p>
            La pente est la <strong>tangente</strong> de l'angle que fait la droite avec l'axe des{' '}
            {tex`x`}.
          </p>
          {tex`
            m = \tan \theta
          `}
        </Remark>
      </Slide>
      <Slide title="Pente et croissance">
        <Python>
          {py.raw`
            import matplotlib.pyplot as plt
            import numpy as np
            x = np.linspace(0, 5, 10)
            plt.plot(x, 2 * x + 1)
            plt.plot(x, 0 * x + 6)
            plt.plot(x, - x + 8)
          `}
        </Python>
        <Proposition>
          <p>Une droite non-verticale d'équation {tex`y = mx + p`} est</p>
          <ul>
            <li>
              <strong>strictement croissante</strong> si et seulement si {tex`m > 0`}
            </li>
            <li>
              <strong>constante</strong> si et seulement si {tex`m = 0`}
            </li>
            <li>
              <strong>strictement décroissante</strong> si et seulement si {tex`m < 0`}
            </li>
          </ul>
        </Proposition>
      </Slide>
      <Slide title="Pente et opérations de fonctions">
        <p>
          Cette propriété, avec celles du slide précédent, est à l'origine du succès des dérivées.
        </p>
        <Theorem>
          <p>Soient {tex`f, g`} deux fonctions linéaires.</p>
          <ul>
            <li>{tex`\mathrm{pente}(\alpha f) = \alpha\, \mathrm{pente}\ f`}</li>
            <li>{tex`\mathrm{pente}(f + g) = \mathrm{pente}\ f + \mathrm{pente}\ g`}</li>
            <li>{tex`\mathrm{pente}(f \circ g) = \mathrm{pente}\ f \ \mathrm{pente}\ g`}</li>
          </ul>
        </Theorem>
      </Slide>
      <Slide title="Trouver l'équation d'une droite">
        <Proposition>
          <p>La droite d'équation</p>
          {tex`
            y = m (x - x_0) + y_0
          `}
          a pour pente {tex`m`} et passe par {tex`(x_0, y_0)`}.
        </Proposition>
        <Example>
          <p>Trouver l'équation de la droite:</p>
          <ul>
            <li>
              ayant comme pente {tex`3`} et passant par {tex`(4, 1)`}
            </li>
            <li>
              ayant comme pente {tex`-2`} et passant par {tex`(-3, 1)`}
            </li>
            <li>
              passant par les points {tex`(-1, 2)`} et {tex`(3, -4)`}
            </li>
          </ul>
        </Example>
        <Jupyter>
          {py.raw`
            from sympy import *
            x, y, m, p = symbols("x y m p")
            line = Eq(y, 3 * x + p) 
            solve(line.subs({ x: 4, y: 1 }))
          `}
        </Jupyter>
      </Slide>
      <Slide title="Autres formats">
        <p>
          Il se peut que l'équation ait un autre format, auquel cas il est parfois judicieux (ou
          non) de réarranger.
        </p>
        <Example>
          <p>
            Esquisse le graphe de l'équation {tex`3x - 5y = 15`}. Quelle est la pente de cette
            droite?
          </p>
        </Example>
      </Slide>
      <Slide title="Parallélisme et perpendicularité">
        <Proposition>
          <p>Deux droites de pentes {tex`m_1, m_2`} sont:</p>
          <ul>
            <li>
              <strong>parallèles</strong> ssi {tex`m_1 = m_2`}
            </li>
            <li>
              <strong>perpendiculaires</strong> ssi {tex` m_1 m_2 = -1`}
            </li>
          </ul>
        </Proposition>
        <Example>
          <p>
            Trouver l'équation de la droite parallèle à la droite {tex`4x + 6y + 5 = 0`} passant par
            le point {tex`(5, 2)`}.
          </p>
        </Example>
        <Example>
          <p>
            Montrer que les droites {tex`2x + 3y = 1`} et {tex`6x - 4x - 1 = 0`} sont
            perpendiculaires.
          </p>
        </Example>
      </Slide>
      <Slide title="Équation vectorielle d'une droite">
        <p>
          Dans {tex`\R^n`}, une droite est déterminée par <strong>un point</strong> et une{' '}
          <strong>direction</strong>.
        </p>
        <Definition title="Équation paramétrique d'une droite">
          {tex`
            \underbrace{\vec r}_{(x, y, z)} = \underbrace{\vec r_0}_{\text{un point}} + t \underbrace{\vec v}_{\text{direction}}
          `}
        </Definition>
        <Geogebra id="F3vjkggB" />
      </Slide>
      <Slide title="Équation paramétrique d'une droite">
        <p>En coordonnées cartésiennes, l'équation {tex`\vec r = \vec r_0 + t \vec v`} s'écrit</p>
        {tex`
          \begin{cases}
            x &= x_0 + at\\
            y &= y_0 + bt\\
            z &= z_0 + ct,
          \end{cases}
          \qquad
          \text{où}\,
          \vec v = (a, b, c)
        `}
        <Example>
          <p>
            Trouve une équation vectorielle et les équations paramétriques de la droite qui passe
            par {tex`(5, 1, 3)`} et qui est parallèle au vecteur {tex`\vec i + 4 \vec j - 2 \vec k`}
            . Ensuite, trouver deux autres points sur la droite.
          </p>
        </Example>
      </Slide>
      <Slide title="Équations cartésiennes d'une droite dans l'espace">
        <p>En isolant le paramètre {tex`t`} dans l'équation ci-dessous</p>
        {tex`
          \begin{cases}
            x &= x_0 + at\\
            y &= y_0 + bt\\
            z &= z_0 + ct,
          \end{cases}
        `}
        <p>on obtient l'équation</p>
        {tex`
          t
          = \boxed{\frac {x - x_0} a
          = \frac {y - y_0} b
          = \frac {z - z_0} c}
        `}
        <p>
          Ces équations sont appelées <strong>équations cartésiennes</strong>.
        </p>
        <Remark>
          <p>
            Remarquez que l'encadré cache <strong>deux équations</strong>. En effet, une droite est
            l'intersection de deux plans.
          </p>
        </Remark>
        <Example>
          <p>
            Trouver les équations paramétriques et cartésiennes de la droite qui passe par les
            points {tex`A(2, 4, -3)`} et {tex`B(3, -1, 1)`}. Quand cette droite intercepte-t-elle le
            plan {tex`xy`}?
          </p>
        </Example>
      </Slide>
      <Slide title="Équations paramétriques d'un plan">
        {tex`
          \vec r = \vec r_0 + s \vec u + t \vec v
        `}
        <Geogebra id="xFsEFZrj" />
      </Slide>
      <Slide title="Équation cartésiennes d'un plan dans l'espace">
        <p>
          Dans l'espace à 3 dimensions, un plan est déterminé par <strong>un point</strong>{' '}
          (déterminé par {tex`\vec r_0`}) et une <strong>direction normale</strong> {tex`\vec n`}.
        </p>
        <p>L'équation cartésienne est donnée par</p>
        {tex`
          \boxed{
            (\vec r - \vec r_0) \cdot \vec n = 0.
          }
        `}
        <p>En coordonnées, cela donne:</p>
        {tex`
          a x + b y + cz = d
          \qquad d = \vec r_0 \cdot \vec n,
          \, \vec n = (a, b, c)
        `}
        <Geogebra id="otC7BvrY" />
      </Slide>
      <Slide title="Passer d'équation paramétrique à cartésienne et vice-versa">
        <Example>
          <ol>
            <li>Convertir l'équation {tex`x + y + z + 1 = 0`} en équation paramétrique.</li>
            <li>
              Convertir l'équation suivante en équation cartésienne:
              {tex`
                \begin{cases}
                  x &= 1 + t\\
                  y &= 1 - t + t'\\
                  z &= 3 + t'
                \end{cases}
              `}
            </li>
          </ol>
        </Example>
      </Slide>
      <Slide title="Exercices">
        <Iframe src="https://pmt.physicsandmathstutor.com//download/Maths/A-level/Pure/Coordinate-Geometry-1/Edexcel-Set-B/Straight%20Lines.pdf" />
      </Slide>
      <Slide title="Exercices">
        <Iframe src="https://pmt.physicsandmathstutor.com/download/Maths/A-level/FP3/Topic-Qs/Edexcel-Set-2/Ch.5%20Vectors.pdf" />
      </Slide>
    </Slideshow>
  )
}
