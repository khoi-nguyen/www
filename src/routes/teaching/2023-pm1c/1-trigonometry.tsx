import meta from './1-trigonometry.json';

export default () => {
  return (
    <Slideshow meta={meta}>
      <Slide
        title={() => (
          <>
            Bienvenue à l'
            <Abbr key="ECAM" />
          </>
        )}
      >
        <p>
          (Re-)Bienvenue! Je vous souhaite une excellente année académique, en espérant qu'elle soit
          fructueuse, enrichissante, instructive et pleine de belles rencontres.
        </p>
        <p>
          Malheureusement, je dois vous rappeler <strong>quelques règles</strong> avant de commencer
          le cours:
        </p>
        <ul>
          <li>
            <strong>Ponctualité</strong>: les retardataires ne seront admis qu'en une fois 15
            minutes après le début du cours.
          </li>
          <li>
            <strong>Respect du temps de parole</strong>: silence lorsque quelqu'un·e s'exprime.
          </li>
          <li>
            <strong>Respect mutuel et de l'apprentissage du groupe</strong>
          </li>
        </ul>
      </Slide>
      <Slide title="À propos de ce cours" columns>
        <div>
          <dl>
            <dt>Objectifs</dt>
            <dd>
              Rappel des notions du cours de mathématiques 6h du secondaire qui vous seront utiles
            </dd>
            <dt>Théorie</dt>
            <dd>NGUYEN Khoi (NGY)</dd>
            <dt>Exercices</dt>
            <dd>
              ANNENKOFF David (ANN), GUERRIERI Rolando (R5G), JOLY Marius (MJ5), MARCHAL Jonas
              (JM5), NGUYEN Khoi (NGY)
            </dd>
            <dt>Resources</dt>
            <dd>
              <ul>
                <li>
                  <Cite key="stewart" reference />
                </li>
                <li>
                  Slides annotés sur mon site web: <A href="/">https://nguyen.me.uk</A>
                </li>
              </ul>
            </dd>
          </dl>
          <p>
            Pour les curieux, les slides sont écrits en TypeScript et sont disponibles sur{' '}
            <a href="https://github.com/khoi-nguyen/www">Github</a>.
          </p>
        </div>
        <div>
          <h3>Brève présentation</h3>
          <ul>
            <li>
              Enseignant en <Abbr key="GEI" />
            </li>
            <li>
              Mes intérêts:
              <ul>
                <li>La pédagogie</li>
                <li>Les mathématiques</li>
                <li>Le logiciel libre</li>
                <li>Les technologies front-end</li>
              </ul>
            </li>
          </ul>
        </div>
      </Slide>
      <Slide title="Où trouver les slides?" columns>
        <Iframe src="/" />
        <div>
          <Instruction pluralize>
            <ol>
              <li>
                Aller sur <A href="/">https://nguyen.me.uk</A>
              </li>
              <li>
                Cliquer sur <Abbr key="ECAM" /> dans la barre de navigation en haut.
              </li>
              <li>Choisissez le cours "Pont Mathématique"</li>
            </ol>
          </Instruction>
        </div>
      </Slide>
      <Slide title="Plan du cours">
        <ol>
          <li>Trigonométrie</li>
          <li>Vecteurs</li>
          <li>Nombres complexes</li>
          <li>Algèbre</li>
          <li>Systèmes</li>
          <li>Géométrie</li>
          <li>Fonctions et limites</li>
          <li>Dérivée</li>
          <li>Fonctions réciproques</li>
        </ol>
      </Slide>
      <Slide title="Degrés et radians" cite={['stewart', 'p. A24']}>
        <p>
          Le <strong>radian</strong> (rad) et le <strong>degré</strong> ({tex`\circ`}) sont deux
          unités d'angle proportionnelles satisfaisant
          {tex`
            1 \, \text{demi-tour} = \pi \,\text{rad} = 180^\circ.
          `}
        </p>
        <table>
          <tbody>
            <tr>
              <th>Degrés</th>
              {['0', '30', '45', '60', '90'].map((angle) => (
                <td>{tex`${angle}^\circ`}</td>
              ))}
            </tr>
            <tr>
              <th>Radians</th>
              <td>{tex`0`}</td>
              {['6', '4', '3', '2'].map((den) => (
                <td>{tex`\frac \pi {${den}}`}</td>
              ))}
            </tr>
          </tbody>
        </table>
        <Question title="Comment convertir?">
          <p>Simplement employer une règle de trois, ou la règle suivante:</p>
          <Mermaid scale={2}>
            {String.raw`
              graph LR
                D(degrés) --"× π/180"--> R(radians)
                R --"× 180/π"--> D
            `}
          </Mermaid>
        </Question>
        <Example title="Conversions">
          <p>Convertir 1 radian en degrés</p>
        </Example>
      </Slide>
      <Slide title="Convertir entre radians et degrés">
        <Example title="Conversions">
          <ul>
            <li>Convertir {tex`60^\circ`} en radians</li>
            <li>Convertir {tex`5 \pi / 4`} en degrés</li>
          </ul>
        </Example>
        <p>
          Exercices 1-12 <Cite key="stewart">p. A32</Cite>
        </p>
        <Remark>
          <p>
            Tout au long du cours, je mettrais des fragments de code en Python que vous pourrez
            exécuter et modifier. Ceux-ci ne font pas partie du cours en tant que tel mais n'hésitez
            pas à expérimenter!
          </p>
          <Jupyter>
            {py`
              from sympy import *
              [60 * pi / 180, 5 * pi / 4 * 180 / pi]
            `}
          </Jupyter>
        </Remark>
      </Slide>
      <Slide title="Pourquoi plusieurs unités?">
        <Question title="Pourquoi plusieurs unités?">
          <ul>
            <li>
              Les <strong>degrés</strong> ont tendance à être des nombres plus facilement
              manipulables.
              {tex`
                \text{quart de tour} = 90^\circ = 1.5707963\dots \text{(rad)}
              `}
            </li>
            <li>
              Les <strong>radians</strong> donnent des formules plus faciles pour
              <ul>
                <li>dérivation et l'intégration/primitivation</li>
                <li>longueur l'arc et aire de secteur</li>
              </ul>
            </li>
          </ul>
        </Question>
      </Slide>
      <Slide title="Longueur d'arc" cite={['stewart', 'p. A24']}>
        <Proposition>
          <p>
            La longueur de l'arc de cercle de rayon {tex`r`} intercepté par un angle au centre
            d'amplitude en <strong>radians</strong> {tex`\theta`} est donnée par
          </p>
          {tex`
            L = r \theta
          `}
        </Proposition>
        <Remark title="Interprétation du radian">
          <p>
            Dans un cercle de rayon 1, on a {tex`L = \theta`}, donc l'amplitude correspond à l'arc
            de cercle.
          </p>
        </Remark>
      </Slide>
      <Slide title="Longueur d'arc: exemple" cite={['stewart', 'p. A24']}>
        <Example>
          <ol>
            <li>Si le rayon est de 5cm, quel angle est sous-tendu par un arc de 6cm?</li>
            <li>
              Si le cercle a un rayon de 3cm, quel est la longueur de l'arc sous-tendu par un angle
              au centre de {tex`3 \pi / 8`}?
            </li>
          </ol>
          <p>
            Exercices: 13-16 <Cite key="stewart">p. A32</Cite>.
          </p>
        </Example>
        <Jupyter>
          {py`
            # Set up L = r theta
            from sympy import *
            L, r, theta = symbols("L r theta")
            equation = Eq(L, r * theta)

            # Substitute values
            equation = equation.subs({ L: 6, r: 5 })

            # Solve
            solve(equation)
          `}
        </Jupyter>
      </Slide>
      <Slide title="Rapports trigonométriques">
        <p>
          Considérons un triangle rectangle dont un des angles aigus a pour mesure {tex`\theta`}.
        </p>
        <Definition title="SOH CAH TOA">
          {tex`
            \sin \theta \defeq \frac {\text{opposé}} {\text{hypothénuse}}, \quad
            \cos \theta \defeq \frac {\text{adjacent}} {\text{hypothénuse}}, \quad
            \tan \theta \defeq \frac {\text{opposé}} {\text{adjacent}}.
          `}
        </Definition>
        <Question>
          <p>En quoi les membres de droite dépendent de {tex`\theta`}?</p>
        </Question>
        <Remark>
          <p>
            Habituez-vous à la situation standard de trouver des longueurs quand l'angle est connu
            et mesuré par rapport à l'horizontale.
          </p>
        </Remark>
      </Slide>
      <Slide title="Exemple: rapports trigonométriques">
        <Example title="Trouver des nombres trigonométriques">
          <p>
            Si {tex`\cos \theta = \frac 2 5`} and {tex`0 < \theta < \pi/2`}, trouver les autres
            nombres trigonométriques.
          </p>
        </Example>
        <Example title="Trouver des longueurs">
          <p>
            Dans un triangle rectangle où le côté opposé à un angle de {tex`40^\circ`} fait 16cm,
            trouver la longueur du côté adjacent.
          </p>
        </Example>
      </Slide>
      <Slide title="Cercle trigonométrique">
        <UnitCircle scale={0.75} />
        <ul>
          <li>
            Le <strong>cercle trigonométrique</strong> est un cercle centré à l'origine de rayon{' '}
            {tex`1`}.
          </li>
          <li>
            Par convention, un angle est orienté <strong>positivement</strong> dans le sens
            antihorloger (de {tex`x`} vers {tex`y`}), ou <strong>négativement</strong> sinon.
          </li>
          <li>
            Pour un point {tex`P`} sur le cercle, on définit {tex`\cos`} et {tex`\sin`} de sorte que
            {tex`
              \vv{OP} = (\cos \theta, \sin \theta),
              \quad \theta = \widehat{AOP},
            `}
          </li>
        </ul>
        <Question>
          <p>Comment lire la tangente et la cotangente sur le cercle trigonométrique?</p>
        </Question>
      </Slide>
      <Slide title="Cercle trigonométrique: animation">
        <Geogebra id="yyufnmy9" />
      </Slide>
      <Slide title="Périodicité, symétrie, angles associés">
        <Proposition title="Périodicité">
          <ul>
            <li>{tex`\sin (x + 2 \pi) = \sin x`}</li>
            <li>{tex`\cos (x + 2 \pi) = \cos x`}</li>
            <li>{tex`\tan (x + \pi) = \tan x`}</li>
          </ul>
        </Proposition>
        <Proposition title="Parité">
          {tex`
            \begin{align*}
              \sin(-\theta) &= -\sin \theta\\
              \cos(-\theta) &= \cos \theta
            \end{align*}
          `}
        </Proposition>
        <Proposition title="Autres propriétés">
          {tex`
            \begin{align*}
              \sin (\pi - x) &= \sin x\\
              \cos (\pi - x) &= -\cos x\\
              \sin (\pi + x) &= -\sin x\\
              \cos (\pi + x) &= -\cos x.
            \end{align*}
          `}
        </Proposition>
      </Slide>
      <Slide title="Identités fondamentales" cite={['stewart', 'p. A28']}>
        <UnitCircle scale={0.75} />
        <Proposition>
          {tex`
            \sin^2 x + \cos^2 x = 1,\quad
            \tan^2 x + 1 = \frac 1 {\cos^2 x},\quad
            1 + \cos^2 x = \frac 1 {\sin^2 x}
          `}
        </Proposition>
      </Slide>
      <Slide title="Propriétés d'addition et de soustraction">
        <Proposition title="Formules d'addition">
          {tex`
            \begin{align*}
              \sin (x \pm y) &= \sin x \cos y \pm \cos x \sin y\\
              \cos (x \pm y) &= \cos x \cos y \mp \sin x \sin y\\
              \tan (x \pm y) &= \frac {\tan x + \tan y} {1 \mp \tan x \tan y}
            \end{align*}
          `}
        </Proposition>
        <Corollary title="Formules de duplication">
          {tex`
            \begin{align*}
              \sin (2 x) &= 2 \sin x \cos x\\
              \cos (2 x) &= \cos^2 x - \sin^2 x\\
              \tan (2 x) &= \frac {2 \tan x} {1 - \tan^2 x}
            \end{align*}
          `}
        </Corollary>
      </Slide>
      <Slide title="Formules de duplication: suite">
        <Corollary title="Formules de duplication">
          {tex`
            \begin{align*}
              \sin (2 x) &= 2 \sin x \cos x\\
              \cos (2 x) &= \cos^2 x - \sin^2 x\\
              \tan (2 x) &= \frac {2 \tan x} {1 - \tan^2 x}
            \end{align*}
          `}
        </Corollary>
        <Remark>
          <p>
            En utilisant la formule fondamentale, on peut également exprimer {tex`\cos 2x`} en une
            fonction trigonométrique:
          </p>
          {tex`
            \cos 2x = 2 \cos^2 x - 1 = 1 - 2 \sin^2 x.
          `}
          En réorganisant, ces formules deviennent:
          {tex`
            \cos^2 x = \frac {1 + \cos 2x} 2\\
            \sin^2 x = \frac {1 - \cos 2x} 2
          `}
        </Remark>
      </Slide>
      <Slide title="Formules de Simpson">
        <Proposition title="Formules de Simpson">
          {tex`
            \begin{align*}
            \cos p + \cos q &= 2 \cos \frac {p + q} 2 \cos \frac {p - q} 2\\
            \cos p - \cos q &= -2 \sin \frac {p + q} 2 \sin \frac {p - q} 2\\
            \sin p + \sin q &= 2 \sin \frac {p + q} 2 \cos \frac {p - q} 2\\
            \sin p - \sin q &= 2 \cos \frac {p + q} 2 \sin \frac {p - q} 2
            \end{align*}
          `}
        </Proposition>
      </Slide>
      <Slide title="Exercices: identités trigonométriques">
        <Iframe src="https://pmt.physicsandmathstutor.com/download/Maths/A-level/Pure/Trigonometry-2/Edexcel-Set-B/Trigonometric%20Identities.pdf" />
      </Slide>
      <Slide title="Fonctions réciproques">
        <Jupyter>
          {py`
            from sympy import *
            acos(1)
          `}
        </Jupyter>
      </Slide>
      <Slide title="Résoudre des équations trigonométriques">
        <Instruction pluralize>
          <ol>
            <li>
              Utiliser les identités trigonométriques pour obtenir des équations du type{' '}
              {tex`\sin (\dots) = \dots`}.
            </li>
            <li>Trouver une valeur pour l'argument avec les fonctions trigonométriques inverses</li>
            <li>
              Utiliser les symmétries du cercle trigonométrique pour trouver d'autres valeurs
              possibles pour l'argument
            </li>
            <li>Résoudre les équations en termes de l'argument</li>
          </ol>
        </Instruction>
        <Example>
          <p>
            Trouver toutes les valeurs de {tex`x`} dans l'intervalle {tex`[0, 2 \pi]`} telles que{' '}
            {tex`\sin x = \sin 2 x`}.
          </p>
        </Example>
      </Slide>
      <Slide title="Résoudre des équations trigonométriques: exercices">
        <Iframe src="https://pmt.physicsandmathstutor.com//download/Maths/A-level/Pure/Trigonometry-2/Edexcel-Set-B/Trigonometric%20Equations.pdf" />
      </Slide>
      <Slide title="Le théorème d'Al-Kashi">
        <Theorem title="Al-Kashi ou Pythagore généralisé">
          Soit un triangle dont les côtés ont {tex`a, b, c`} comme longueur. Si l'on denote{' '}
          {tex`\gamma`} l'angle opposé à {tex`c`}, alors on a
          {tex`
            c^2 = a^2 + b^2 - 2 ab \cos \gamma.
          `}
        </Theorem>
      </Slide>
    </Slideshow>
  );
};
