import meta from './3-complex-numbers.json';

export default () => {
  return (
    <Slideshow meta={meta}>
      <Slide title="Nombres complexes: approche algébrique">
        <Definition title="Unité imaginaire">
          <p>
            L'<strong>unité imaginaire</strong>, noté {tex`i`}, est un nombre tel que{' '}
            {tex`i^2 = -1`}.
          </p>
        </Definition>
        {tex`
          \C \defeq \{a + bi : a, b \in \R\}.
        `}
        <Remark title="Notation">
          <p>
            On écrit parfois {tex`j`} au lieu de {tex`i`} (par exemple, en élecricité ou en Python).
          </p>
        </Remark>
        <p>Les règles algébriques des nombres réels sont étendues pour inclure {tex`i`}.</p>
        <Jupyter>
          {py`
            1j * 1j
          `}
        </Jupyter>
      </Slide>
      <Slide title="Manipulations algébriques">
        <Example>
          <p>Calcule {tex`(-1 + 3i) (2 - 5i)`}</p>
        </Example>
        <Jupyter>
          {py`
            (-1 + 3j) * (2 - 5j)
          `}
        </Jupyter>
        <Example>
          <p>
            Écrire le nombre {tex`\frac {-1 + 3i} {2 + 5i}`} sous la forme {tex`a + bi`}
          </p>
        </Example>
        <Jupyter>
          {py`
            from sympy import *
            simplify((-1 + 3 * I) / (2 + 5 * I))
          `}
        </Jupyter>
      </Slide>
      <Slide title="Résoudre des équations">
        <p>
          Toute l'algèbre développée sur {tex`\R`} s'applique sur {tex`\C.`}
        </p>
        <Example>
          <p>Trouver les racines de l'équation</p>
          {tex`
            x^2 + x + 1 = 0.
          `}
        </Example>
        <Jupyter>
          {py`
            from sympy import *
            x = Symbol("x")
            solve(x ** 2 + x + 1)
          `}
        </Jupyter>
      </Slide>
      <Slide title="Nombres complexes: interprétation géométrique">
        <Definition>
          <p>Un nombre complexe est un vecteur dans {tex`\R^2`}.</p>
        </Definition>
        <Remark>
          <ul>
            <li>
              Pour ne pas alourdir la notation, on identifie un nombre réel {tex`x`} à son
              équivalent complexe {tex`(x, 0)`}.
            </li>
            <li>
              Le vecteur {tex`(0, 1)`} est dénoté {tex`i`}.
            </li>
          </ul>
        </Remark>
        <ul>
          <li>
            L'addition de nombres complexes est l'<strong>addition vectorielle</strong>
          </li>
          <li>
            La multiplication de nombres complexes est l'extension de la{' '}
            <strong>multiplication scalaire</strong> d'un vecteur.
          </li>
          <li>
            Dans le contexte des nombres complexes, on parle de <strong>plan de Gauss</strong>.
          </li>
        </ul>
      </Slide>
      <Slide title={() => <>Multiplication par {tex`i`}</>}>
        <Question>
          <p>
            Que signifie multiplier un vecteur de {tex`\R^2`} par {tex`i`}?
          </p>
        </Question>
        <p>
          Multiplier par {tex`i = (0, 1)`}, c'est tourner de {tex`90^\circ`} dans le sens
          anti-horloger.
        </p>
        <Example>
          <p>Représente la multiplication {tex`i \cdot i`}.</p>
        </Example>
      </Slide>
      <Slide title="Coordonnées polaires">
        Tout nombre complexe {tex`z`} peut s'écrire
        {tex`
          z = r (\cos \theta + i \sin \theta)
        `}
        <ul>
          <li>
            {tex`r`} est la norme (appelée <strong>module</strong>, noté {tex`\abs z`}) du nombre
            complexe
          </li>
          <li>
            {tex`\theta`} est l'angle avec l'axe réel (appelé <strong>argument</strong>, noté{' '}
            {tex`\arg z`})
          </li>
        </ul>
        <Question>
          <p>
            Comment trouver {tex`r`} et {tex`\theta`}?
          </p>
        </Question>
        <Proposition>
          {tex`
            \begin{cases}
              a = r \cos \theta\\
              b = r \sin \theta
            \end{cases}
            \iff
            \begin{cases}
              r = \sqrt{a^2 + b^2}\\
              \tan \theta = \frac b a
            \end{cases}
          `}
        </Proposition>
        <p>
          <strong>Attention</strong>. Il se peut que l'arctangente ne donne pas le bon angle, vu que
          la calculatrice ne donne que la valeurs dans les quadrants I et IV.
        </p>
        {tex`
          \theta = \arctan\left(\frac b a\right) +
          \begin{cases}
            \pi & \text{si } a < 0, b > 0\\
            -\pi & \text{si } a < 0, b < 0\\
            0 & \text{sinon}
          \end{cases}
        `}
      </Slide>
      <Slide title="Exemples: conversions en coordonnées polaires">
        <Example>
          <p>Écrire les nombres suivants en coordonnées polaires, ensuite, les multiplier</p>
          {tex`
            z = -1 + i, \qquad w = \sqrt 3 - i
          `}
        </Example>
        <Jupyter>
          {py`
            from sympy import *
            a = 1
            b = 1
            a, b = sympify(a), sympify(b)
            r = sqrt(a**2 + b**2)
            theta = atan(b / a)
            if a < 0 and b > 0: # deuxième quadrant
                theta += pi
            if a < 0 and b < 0: # troisième quadrant
                theta -= pi
            r, theta
          `}
        </Jupyter>
      </Slide>
      <Slide title="Interprétation de la multiplication complexe">
        <div class="columns">
          <div>
            <p>Multiplier par {tex`z`}, c'est</p>
            <ul>
              <li>Multiplier par {tex`\abs z`}</li>
              <li>Effectuer une rotation de {tex`\arg z`}</li>
            </ul>
          </div>
          <div>
            <p>Diviser par {tex`z`}, c'est</p>
            <ul>
              <li>Diviser par {tex`\abs z`}</li>
              <li>Effectuer une rotation de {tex`-\arg z`}</li>
            </ul>
          </div>
        </div>
        <p>
          En particulier, si {tex`z_1 = r_1 (\cos \theta_1 + i \sin \theta_1)`} et{' '}
          {tex`z_2 = r_2 (\cos \theta_2 + i \sin \theta_2)`}, alors
        </p>
        {tex`
          \begin{align*}
            z_1 z_2 = r_1 r_2 (\cos (\theta_1 + \theta_2) + i \sin(\theta_1 + \theta_2))\\
            \frac {z_1} {z_2} = \frac {r_1} {r_2} (\cos (\theta_1 - \theta_2) + i \sin(\theta_1 - \theta_2))\\
          \end{align*}
        `}
      </Slide>
      <Slide title="Multiplication complexe: animation" columns>
        <Geogebra id="qtkwq63r" />
        <div>
          <p>Si vous revenez de la Vulcania, employez plutôt cette animation-ci:</p>
          <Geogebra id="Agnj5JSt" />
        </div>
      </Slide>
      <Slide title="Conjuguaison">
        <Definition title="Complexe conjugué">
          <p>
            Soit {tex`z = a + bi \in \C`}. Le nombre {tex`\overline z = a - bi`} est appelé{' '}
            <strong>complexe conjugué</strong> de {tex`z`}.
          </p>
        </Definition>
        <Proposition>
          {tex`
            \overline{z + w} = \overline{z} + \overline w, \quad
            \overline{z w} = \overline{z} \overline w, \quad
            z \overline z = \abs z^2
          `}
        </Proposition>
        <Example>
          <p>
            Écrire le nombre {tex`\frac {-1 + 3i} {2 + 5i}`} sous la forme {tex`a + bi`}
          </p>
        </Example>
      </Slide>
      <Slide title="Formule de de Moivre">
        <Theorem title="Formule de de Moivre">
          {tex`
            (\cos \theta + i \sin \theta)^n
            = \cos n\theta + i \sin n \theta.
          `}
        </Theorem>
        <Example>
          <p>Calcule {tex`\left(\frac 1 2 + \frac 1 2 i\right)^{10}`}</p>
        </Example>
        <Jupyter>
          {py`
            from sympy import *
            z = Rational(1/2) + Rational(1/2) * I
            expand(z ** 10)
          `}
        </Jupyter>
      </Slide>
      <Slide title="Formule d'Euler">
        <Theorem title="Formule d'Euler">
          {tex`
            e^{i \theta} = \cos \theta + i \sin \theta
          `}
        </Theorem>
        <Fragment>
          <Remark>
            <p>
              Ce théorème signifie qu'en étendant l'algèbre des nombres réels pour modéliser les
              rotations du plan, on se rend compte que la trigonométrie et l'exponentiation sont la
              même opération.
            </p>
            <p>
              La preuve de ce résultat est établie par le calcul différentiel et intégral. On est
              bien loin du cadre des triangles!
            </p>
          </Remark>
          <Example>
            <p>
              Calculer {tex`e^{i \pi}`}, {tex`e^{-1 + i \pi/2}`} et {tex`i^i`}.
            </p>
          </Example>
        </Fragment>
      </Slide>
      <Slide title="Racines n-ième">
        <Proposition>
          <p>
            Soit {tex`z = r e^{i \theta}`}. L'équation {tex`w^n = z`} a pour solutions
          </p>
          {tex`
            w_k = \sqrt[n] r e^{i \frac {\theta + 2 k \pi} n},
            \quad k = 0, 1, \dots, n - 1.
          `}
        </Proposition>
        <Example>
          <p>Trouver les 6 solutions de {tex`w^6 = -8`}.</p>
        </Example>
      </Slide>
      <Slide title="Exercices">
        <Iframe src="https://pmt.physicsandmathstutor.com/download/Maths/A-level/FP1/Topic-Qs/Edexcel-Set-2/Ch.1%20Complex%20Numbers.pdf" />
      </Slide>
      <Slide title="Applications">
        <p>On cherche souvent à résoudre des équations différentielles du type:</p>
        {tex`
          a f'' + b f' + c f = 0.
        `}
        Si l'on écrit {tex`f(t) = e^{z t}`}, que devient l'équation ci-dessus?
      </Slide>
      <Slide title="Électricité">
        <ul>
          <li>Courant alternatif: {tex`U(t) = U_0 \cos(\omega t) \to U_0 e^{i \omega t}`}</li>
          <li>
            Inducteur:
            {tex`
              \boxed{U(t) = L i'(t)}
              \implies i(t) = \frac {U(t)} {i \omega L}
            `}
          </li>
        </ul>
        <p>Dans ce langage, un inducteur se comporte comme une "résistance complexe".</p>
      </Slide>
    </Slideshow>
  );
};
