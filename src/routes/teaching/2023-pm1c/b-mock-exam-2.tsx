import meta from './b-mock-exam-2.json';

export default () => {
  return (
    <Slideshow meta={meta}>
      <Slide title="Dernières annonces">
        <ul>
          <li>
            Changements au formulaire
            <ul>
              <li>Dérivée de tangente, cotangente</li>
              <li>Équations différentielles</li>
            </ul>
          </li>
          <li>L'examen a été raccourci à 9 questions</li>
          <li>Remédiation vendredi (peu d'entre vous venez, va-t-il y avoir plein de 20/20?)</li>
          <li>
            Séances d'exercices
            <ul>
              <li>TP 19: trigonométrie, vecteurs (éq paramétriques)</li>
              <li>TP 20: </li>
              <li>TP 21: questions/réponses individuelles</li>
            </ul>
          </li>
          <li>Qui va vous donner cours au deuxième quadri?</li>
        </ul>
      </Slide>
      <Slide title="Q1. Équations différentielles">
        <Exercise>
          <p>Considérons l'équation différentielle</p>
          {tex`
            9 \frac {\dd^2 y} {\dd x^2} - y(x) = 0.
          `}
          <ol>
            <li>
              (3 points) Donner l'équation caractéristique et la résoudre dans {tex`\mathbb C`}
            </li>
            <li>(2 points) En déduire la solution génerale de l'équation différentielle</li>
            <li>(6 points) Donner la solution particulière satisfaisant {tex`y(0) = y'(0) = 1`}</li>
          </ol>
        </Exercise>
        <Fragment hideUntil={new Date('2023-10-24')}>
          <ol>
            <li>
              B1 pour {tex`9 \lambda^2 - 1`}, M1 A1 pour {tex`\lambda = \pm \frac 1 3`}
            </li>
            <li>M1 A1 pour {tex`y = A e^{\frac x 3} + B e^{-\frac x 3}`}</li>
            <li>
              <ul>
                <li>M1 A1 pour {tex`y' = \frac A 3 e^{\frac x 3} - \frac B 3 e^{-\frac x 3}`}</li>
                <li>
                  M1 pour le système, M1 A1 pour sa résolution
                  {tex`
                    \begin{cases}
                      A + B = 1\\
                      A - B = 3
                    \end{cases}
                    \implies
                    A = 2, B = -1
                  `}
                </li>
                <li>A1 pour {tex`y = 2 e^{\frac x 3} - e^{-\frac x 3}`}</li>
              </ul>
            </li>
          </ol>
        </Fragment>
      </Slide>
      <Slide title="Q2. Vecteurs">
        <p>Soient les droites données par les équations</p>
        {tex`
          \vec{r_1}
          = \begin{pmatrix}-1\\ 5\\ 2\end{pmatrix} + \lambda \begin{pmatrix}2\\ a\\ 0\end{pmatrix}
          \qquad
          \vec{r_2}
          = \begin{pmatrix}4\\ -1\\ 3\end{pmatrix} + \mu \begin{pmatrix}0\\ 1\\ -1\end{pmatrix}
        `}
        <ul>
          <li>
            (4 points) Sachant que les droites ont un angle de 120 degrés entre elles, calculer la
            valeur de {tex`a`}.
          </li>
          <li>(5 points) Trouver l'intersection entre les deux droites</li>
        </ul>
      </Slide>
      <Slide title="Q3. Trigonométrie">
        <Exercise>
          <p>Supposons que</p>
          {tex`
            f(x) = 12 \cos x - 4 \sin x = R \cos(x + \alpha),
            \quad R > 0, 0^\circ \leq \alpha \leq 90^\circ
          `}
          <ol>
            <li>
              (4 points) Trouve la valeur de {tex`R`} et celle de {tex`\alpha`}
            </li>
            <li>
              (5 points) Dès lors, résoudre l'équation
              {tex`
                12 \cos x - 4 \sin x = 7,
                \quad 0^\circ \leq x \leq 360^\circ.
              `}
            </li>
            <li>(1 point) Quelle est la valeur minimale de {tex`f`}?</li>
          </ol>
        </Exercise>
        <Fragment hideUntil={new Date('2023-10-24')}>
          <ul>
            <li>M1 A1 pour {tex`\sqrt{12^2 +4^2} = \sqrt{160}`}</li>
            <li>
              M1 A1 pour {tex`\tan \alpha = \frac 4 {12} \implies \alpha \approx 18.43^\circ`}
            </li>
            <li>M1 pour {tex`\cos(x + \alpha) = \frac 7 R`}</li>
            <li>M1 A1 pour {tex`x + \alpha = \pm 56,4 + 2 k \pi`}</li>
            <li>A1 A2 pour {tex`38,0^\circ, 285,2^\circ`}</li>
            <li>B1ft pour leur valeur de {tex`R`}</li>
          </ul>
        </Fragment>
      </Slide>
      <Slide title="Q4. Fonctions et transformations graphiques">
        <Iframe src="https://pmt.physicsandmathstutor.com//download/Maths/A-level/Pure/Algebra-and-Functions-1/Edexcel-Set-A/Transformations%20and%20Graphs.pdf" />
      </Slide>
      <Slide title="Q5. Dérivation">
        <Iframe src="https://pmt.physicsandmathstutor.com//download/Maths/A-level/Pure/Differentiation-2/AQA-Set-A/Differentiation.pdf" />
      </Slide>
      <Slide title="Dérivation">
        <Iframe src="https://stepdatabase.maths.org/database/db/94/94-S1.pdf" />
      </Slide>
      <Slide title="Droites">
        <Iframe src="https://pmt.physicsandmathstutor.com//download/Maths/A-level/Pure/Coordinate-Geometry-2/Edexcel-Set-A/Straight%20Lines.pdf" />
      </Slide>
      <Slide title="Nombres complexes">
        <img
          src="https://stepdatabase.maths.org/database/db/89/89-S1-Q8.png"
          style={{ width: '100%' }}
        />
        <p>Rappel:</p>
        {tex`
          (a + b)^n = \sum_{k = 0}^n \binom n k a^k b^{n - k}
        `}
        <img
          src="https://stepdatabase.maths.org/database/db/90/90-S3-Q1.png"
          style={{ width: '100%' }}
        />
      </Slide>
    </Slideshow>
  );
};
