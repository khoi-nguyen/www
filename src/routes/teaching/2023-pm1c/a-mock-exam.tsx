const meta: Metadata = {
  title: 'Examen blanc',
  description: "Questions d'examens sur un peu tous les chapitres",
  lang: 'fr',
}

export default () => {
  return (
    <Slideshow meta={meta}>
      <Slide title="Avant de commencer">
        <h3>Avertissement</h3>
        <ul>
          <li>Le but est d'illustrer la difficulté des questions, pas de donner des "tuyaux"</li>
          <li>Cet "examen blanc" ne comporte pas tous les points de matière</li>
        </ul>
        <h3>Procédure</h3>
        <ul>
          <li>Nous allons faire 7 questions d'examen (le vrai en a 10)</li>
          <li>Je vous laisse 1 min par point (vous aurez 1min30 par point à l'examen)</li>
          <li>Ensuite on fait la correction au tableau et on parcourt les critères</li>
        </ul>
      </Slide>
      <Slide title="Où trouver des questions de niveau examen?" columns>
        <Iframe src="https://www.physicsandmathstutor.com/a-level-maths/past-paper-questions-by-topic/" />
        <div>
          <p>
            Les questions sont inspirées très fortement du baccalauréat britannique (maths 5H) avec
            un ou deux chapitres de "further maths" (maths 10H).
          </p>
          <ul>
            <li>
              <a href="https://www.physicsandmathstutor.com/a-level-maths/past-paper-questions-by-topic/">
                https://www.physicsandmathstutor.com/a-level-maths/past-paper-questions-by-topic/
              </a>
            </li>
            <li>
              Voir dans <strong>Core</strong> et <strong>Further</strong>
            </li>
            <li>Privilégier l'examen Edexcel</li>
          </ul>
        </div>
      </Slide>
      <Slide title="Un peu de dépassement" columns>
        <Iframe src="https://alevelmathsrevision.com/step-questions-by-topic/" />
        <div>
          <a href="https://alevelmathsrevision.com/step-questions-by-topic/">
            https://alevelmathsrevision.com/step-questions-by-topic/
          </a>
          <p>
            L'examen STEP est utilisé par les universités anglaises dans leur premier round de
            recrutement des meilleures universités anglaises (Cambridge, Imperial College, Warwick).
            STEP III a pour réputation d'être difficile.
          </p>
          <p>
            Ces questions sont toujours destinées à des étudiants de secondaire mais elles dépassent
            le cadre de notre cours.
          </p>
        </div>
      </Slide>
      <Slide title="Questions et critères de correction">
        <p>
          Nous emploierons les mêmes types de questions et les mêmes critères que les grilles de
          correction du baccalauréat britannique. Les spécificités sont les suivantes.
        </p>
        <ul>
          <li>
            Les questions sont coupées en un nombre de sous-questions le plus indépendantes
            possibles.
          </li>
          <li>
            Des points de <strong>méthode</strong> vous seront accordés même si vous faites des
            erreurs pour mitiger l'impact des erreurs de distraction.
          </li>
          <li>Une réponse sans raisonnement ne sera souvent pas comptabilisée</li>
        </ul>
        <p>
          En pratique, cela vous encourage à écrire votre raisonnement et vous donne beaucoup de
          questions d'examen pour vous entraîner.
        </p>
      </Slide>
      <Slide title="Question 1: trigonométrie">
        <ol>
          <li>
            (4 points) Montrer que
            {tex`
              \frac {\cos x} {1 + \sin x} + \frac {1 + \sin x} {\cos x}
              = \frac 2 {\cos x},
              \quad x \neq (2n + 1) \frac \pi 2.
            `}
          </li>
          <li>
            (3 points) <strong>Dès lors,</strong> trouver toutes les solutions de
            {tex`
              \frac {\cos x} {1 + \sin x} + \frac {1 + \sin x} {\cos x}
              = 4
            `}
          </li>
        </ol>
        <Fragment hideUntil={new Date('2023-10-17')}>
          <h3>Correction</h3>
          <ul>
            <li>M1 A1: mettre sous le même dénominateur</li>
            <li>M1: mettre en évidence {tex`(1 + \sin x)`}</li>
            <li>A1 preuve complètement correcte</li>
          </ul>
          <ul>
            <li>M1 pour {tex`\cos x = \frac 1 2`}</li>
            <li>A1, A1 pour {tex`\frac \pi 3, \frac {5 \pi} 3`}</li>
          </ul>
        </Fragment>
      </Slide>
      <Slide title="Question 2: vecteurs">
        <p>Given {tex`\vec a = \vec i + \vec j`},</p>
        {tex`
          \vec a = \vec i + \vec j,
          \quad
          \vec b = 3 \vec i - \vec j + \vec k,
          \quad
          \vec c = 2 \vec i + \vec j - \vec k
        `}
        <ol>
          <li>(3 points) Calculer {tex`\vec b \times \vec c`}</li>
          <li>(2 points) Calculer {tex`\vec a \cdot (\vec b \times \vec c)`}</li>
          <li>(2 points) L'aire du triangle OBC</li>
          <li>(1 points) Le volume du tétraèdre OABC</li>
        </ol>
        <Fragment hideUntil={new Date('2023-10-17')}>
          <h3>Correction</h3>
          <ul>
            <li>M1 A2: {tex`(0, 5, 5)`}, A1 pour deux composantes correctes</li>
            <li>M1 A1: {tex`5`}</li>
            <li>M1 A1: {tex`\frac 5 2 \sqrt 2`}</li>
            <li>B1: {tex`5/6`}</li>
          </ul>
        </Fragment>
      </Slide>
      <Slide title="Question 3: nombres complexes">
        <ol>
          <li>
            (2 points) Exprime {tex`-9i`} sous la forme {tex`r e^{i \theta}`}, avec {tex`r > 0`} et{' '}
            {tex`-\pi < \theta \leq \pi`}.
          </li>
          <li>
            (5 points) Résoudre l'équation {tex`z^4 + 9 i = 0`}, donnant vos réponses sous la forme{' '}
            {tex`r e^{i \theta}`} avec {tex`r > 0`} et {tex`-\pi < \theta \leq \pi`}.
          </li>
        </ol>
        <Fragment hideUntil={new Date('2023-10-17')}>
          <h3>Correction</h3>
          <ul>
            <li>
              B1 pour {tex`r = 9`}, B1 pour {tex`\theta = -\frac \pi 2`}
            </li>
            <li>B1 pour {tex`r = \sqrt 3`}</li>
            <li>M1 si vous diviser {tex`\theta`} par 4</li>
            <li>
              A1 pour deux angles corrects dans le bon intervalle, A1 si les quatre angles sont
              corrects modulo {tex`2 \pi`}
              {tex`
                \theta = -\frac {5 \pi} 8, -\frac \pi 8, \frac {3 \pi} 8, \frac {7 \pi} 8
              `}
            </li>
            <li>A1 pour les 4 solutions dans le bon intervalle</li>
          </ul>
        </Fragment>
      </Slide>
      <Slide title="Question 4: système">
        {tex`
          \begin{cases}
            x + 2 y + 3z = 4\\
            x + ky + 4z = 6\\
            x + 2y + (k + 2) z = 6\\
          \end{cases}
        `}
        <ol>
          <li>
            (4 points) Échelonner la matrice en spécifiant bien les transformations que vous
            appliquez
          </li>
          <li>(2 points) Que se passe-t-il lorsque {tex`k = 1`}?</li>
          <li>(3 point) Résolvez le système lorsque {tex`k \neq 1`}</li>
        </ol>
        <Fragment hideUntil={new Date('2023-10-17')}>
          <h3>Correction</h3>
          <ol>
            <li>B1 pour écriture matricielle</li>
            <li>
              M1 pour des transformations correctes pour créer deux 0 en colonne 1, M1 pour un 0 en
              colonne 2
            </li>
            <li>A1 si la dernière équation est équivalente à {tex`(k - 1) z = 2`}</li>
            <li>M1 A1 si remplace {tex`k = 1`} et montrer que c'est impossible</li>
            <li>B1 pour {tex`z = \frac 2 {k - 1}`}</li>
            <li>M1 A1 pour {tex`x =\frac {4k - 14} {k - 1}, y = z = \frac 2 {k - 1}`}</li>
          </ol>
        </Fragment>
      </Slide>
      <Slide title="Question 5: Dérivées">
        <p>
          La parabole d'équation {tex`y = -\frac 2 9 x^2 + 8`} coupe l'axe des abscisses en {tex`A`}{' '}
          et {tex`B`}. Le point {tex`P(x, y)`} se déplace sur la parabole entre A et B.
        </p>
        <ol>
          <li>
            (5 points) Montrer que l'aire du triangle ABP est donnée par
            {tex`
                A(x) = -\frac 1 9 x^3 - \frac 2 3 x^2 + 4x + 24
              `}
          </li>
          <li>
            (4 points) Quand est-ce que l'aire est maximale? Prouver que c'est bien un maximum.
          </li>
          <li>(2 points) Que vaut cette aire maximale?</li>
        </ol>
        <Fragment hideUntil={new Date('2023-10-17')}>
          <h3>Correction</h3>
          <ul>
            <li>M1 A1 pour calcul des coordonnées de A</li>
            <li>M1 A1 pour {tex`\frac 1 2 b h`}</li>
            <li>A1 pour développement complètement correct</li>
            <li>M1 A1 pour le calcul de dérivée</li>
            <li>M1 A1 pour le calcul de point critique {tex`x = 2`}</li>
            <li>M1 A1 pour une preuve adéquate que c'est un maximum</li>
            <li>M1 A1 pour {tex`\frac {256} 9`}</li>
          </ul>
        </Fragment>
      </Slide>
      <Slide title="Question 6: exponentielles et logarithmes">
        <p>Étant donné que</p>
        {tex`
          2 \log_2 (x + 15) - \log_2 x = 6,
        `}
        <ol>
          <li>(5 points) Montrer que {tex`x^2 - 34x + 225 = 0`}</li>
          <li>(3 points) Dès lors, résoudre cette équation</li>
        </ol>
        <Fragment hideUntil={new Date('2023-10-17')}>
          <h3>Correction</h3>
          <ol>
            <li>M2 pour l'utilisation des propriétés des log</li>
            <li>M1 pour le passage à l'exponentielle</li>
            <li>M1 A1 pour la réponse finale attendue</li>
            <li>B1 utilisation du point précédent</li>
            <li>M1 A1 résolution de l'équation quadratique (9, 25)</li>
          </ol>
        </Fragment>
      </Slide>
      <Slide title="Question 7: limite">
        <p>
          Calculer la limite précédente, en justifiant pourquoi vous appliquez la règle de l'Hôpital
        </p>
        {tex`
          \lim_{x \to 0} \frac {e^{x^2} - 1} {1 - \cos 3x}
        `}
        <Fragment hideUntil={new Date('2023-10-17')}>
          <h3>Correction</h3>
          <ul>
            <li>B1 pour 0/0</li>
            <li>
              M1 A1 pour calcul de {tex`f'/g'`}. Octroyé si la dérivée de composée est appliquée en
              haut et en bas.
            </li>
            <li>M1 A1 Réapplication de l'Hôpital ou utilisation des limites classiques</li>
            <li>A1 Réponse finale devrait être {tex`\frac 2 9`}</li>
          </ul>
        </Fragment>
      </Slide>
    </Slideshow>
  )
}
