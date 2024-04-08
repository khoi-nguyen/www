const meta: Metadata = {
  title: 'Champs de vecteurs',
  subtitle: 'Chapitre 3',
  description: 'Intégrales de contour et de surface',
  lang: 'fr',
}

export default function () {
  return (
    <Slideshow meta={meta}>
      <Slide title="Champs de vecteurs">
        <Definition>
          <p>Un champ de vecteur est une fonction</p>
          {tex`
            \vec F : D \subset \R^2 \to \R^2
          `}
        </Definition>
        <p>On a une définition analogue sur {tex`\R^3`}</p>
      </Slide>
      <Slide title="Représentation d'un champ de vecteur à 2 dimensions">
        <Example>
          <p>Représentez le champ de vecteur {tex`\vec F(x, y) = -y \vec i + x \vec j`}.</p>
        </Example>
        {py.jupyter`
          import numpy as np
          import matplotlib.pyplot as plt
          x, y = np.meshgrid(
            np.linspace(-2, 2, 10),
            np.linspace(-2, 2, 10),
          )
          F = [-y, x]
          plt.quiver(x, y, *F, color='g')
        `}
      </Slide>
      <Slide title="Représentation d'un champ de vecteur à 3 dimensions">
        <Example>
          <p>Représentez le champ de vecteur {tex`\vec F(x, y, z) = z \vec k`}.</p>
        </Example>
        {py.jupyter`
          import numpy as np
          import matplotlib.pyplot as plt
          x, y, z = np.meshgrid(
            np.linspace(-2, 2, 5),
            np.linspace(-2, 2, 5),
            np.linspace(-2, 2, 5)
          )
          F = [0, 0, z]
          fig = plt.figure()
          ax = fig.add_subplot(111, projection='3d')
          ax.quiver(x, y, z, *F, color='g')
        `}
      </Slide>
      <Slide title="Exemple: loi de la gravitation">
        <Example>
          {tex`
            \norm {\vec F} = \frac {m M G} {r^2}
            \Longleftrightarrow
            \vec F(\vec x) = -\frac {m M G} {\norm{\vec x}^3} \vec x
          `}
        </Example>
        {py.jupyter`
          import numpy as np
          import matplotlib.pyplot as plt
          x, y, z = np.meshgrid(
            np.linspace(-2, 2, 5),
            np.linspace(-2, 2, 5),
            np.linspace(-2, 2, 5)
          )
          r = (x**2 + y**2 + z**2)**(1/2)
          F = [-x/r**3, -y/r**3, -z/r**3]
          fig = plt.figure()
          ax = fig.add_subplot(111, projection='3d')
          ax.quiver(x, y, z, *F, color='g')
        `}
      </Slide>
      <Slide title="Exemple: loi de Coulomb">
        <Example>
          {tex`
            \vec F(\vec x) = \frac {\epsilon q Q} {\norm {\vec x}^3} \vec x\\
          `}
        </Example>
        <Remark>
          <p>Champ électrique: force par unité de charge</p>
          {tex`
            \vec E(\vec x) = \frac {\epsilon Q} {\norm {\vec x}^3} \vec x\\
          `}
        </Remark>
      </Slide>
      <Slide title="Champ gradients">
        {tex`
          \grad f(x, y, z) = \frac {\partial f} {\partial x} \vec i
          + \frac {\partial f} {\partial y} \vec j
          + \frac {\partial f} {\partial z} \vec k
        `}
        <Question>
          <ul>
            <li>Quand un champ de vecteur est-il un champ gradient?</li>
          </ul>
        </Question>
      </Slide>
      <Slide title="Champ gradient: exemple">
        <Example>
          <p>
            Trouvez le champ gradient de {tex`f(x, y) = x^2 y - y^3`}. Esquissez champ gradient et
            les courbes de niveau de {tex`f`}. Comment sont-ils reliés?
          </p>
        </Example>
        {py.jupyter`
          import numpy as np
          import matplotlib.pyplot as plt
          x, y = np.meshgrid(np.linspace(-2, 2, 10), np.linspace(-2, 2, 10))
          F = [2*x*y, x**2 - 3*x**2]
          plt.quiver(x, y, *F, color='g')
          x, y = np.meshgrid(np.linspace(-2, 2, 100), np.linspace(-2, 2, 100))
          f = x**2 * y - y**3
          plt.contour(x, y, f, levels=30)
        `}
      </Slide>
      <Slide title="Conservation de l'énergie">
        <Theorem>
          <p>
            Si un point {tex`\vec x`} est soumis à une force {tex`\vec F = \grad f`}, alors la
            quantité
          </p>
          {tex`
            E(t) = \frac 1 2 m \norm {\frac {\dd x} {\dd t}}^2 - f(\vec x(t))
          `}
          <p>est constante.</p>
        </Theorem>
      </Slide>
      <Slide title="Intégrales curvilignes">
        <Geogebra id="WCXTg3t2" />
        <p>
          L'intégrale curviligne représente l'<strong>aire algébrique</strong> du ruban défini par
          le graphe et une courbe dans le domaine. C'est une notion indispensable pour définir le{' '}
          <strong>travail</strong>.
        </p>
      </Slide>
      <Slide title="Intégrale curviligne: définition">
        <Definition>
          {tex`
            \int_C f(x, y) \dd s
            = \lim_{n \to +\infty} \sum_{i} f(x_i, y_i) \Delta s_i
          `}
        </Definition>
        {tex`
          \dd s = \sqrt{\dd x^2 + \dd y^2} = \sqrt{
            \left(\frac {\dd x} {\dd t}\right)^2 + \left(\frac {\dd y} {\dd t}\right)^2
          } \dd t
        `}
        <Proposition>
          {tex`
            \int_C f(x, y) \dd s
            &= \int_a^b f(\vec r(t)) \norm {\frac {\dd \vec r} {\dd t}} \dd t
          `}
        </Proposition>
      </Slide>
      <Slide title="Exemple: intégrale sur un demi-cercle">
        {tex`
          \int_C f(x, y) \dd s
          = \int_a^b f(\underbrace{x(t), y(t)}_{\vec r(t)}) \underbrace{\sqrt{
            \left(\frac {\dd x} {\dd t}\right)^2 + \left(\frac {\dd y} {\dd t}\right)^2
          }}_{\norm{\frac {\dd \vec r} {\dd t}}} \dd t

        `}
        <Example>
          <p>Calculez</p>
          {tex`
            \int_C 2 + x^2 y \dd s
          `}
          <p>où {tex`C`} est la partie supérieure du cercle unité.</p>
        </Example>
        {py.jupyter`
          from sympy import *
          t = symbols("t")
          x, y = cos(t), sin(t)
          ds = sqrt(x.diff(t) ** 2 + y.diff(t) ** 2)
          integrate((2 + x**2 * y) * ds, (t, 0, pi))
        `}
      </Slide>
      <Slide title="Autres intégrales curvilignes">
        {tex`
          \dd s = \norm {\frac {\dd r} {\dd t}} \dd t \qquad
          \dd x = \frac {\dd x} {\dd t} \dd t \qquad
          \dd y = \frac {\dd y} {\dd t} \dd t
        `}
        <Example>
          {tex`
            \int_C y^2 \dd x + x \dd y
          `}
          <p>
            où {tex`C`} est la parabole {tex`x = 4 - y^2`} de {tex`(-5, -3)`} à {tex`(0, 2)`}.
          </p>
        </Example>
        {py.jupyter`
          from sympy import *
          y = symbols("y")
          x = 4 - y** 2
          dx, dy = x.diff(y), y.diff(y)
          f = y**2 * dx + x * dy
          I = integrate(f, (y, -3, 2))
        `}
      </Slide>
      <Slide title="Intégrale curviligne de champs de vecteurs (circulation)">
        <Definition>
          {tex`
            \dd \vec r = \vec T \dd s
          `}
          <p>
            oû {tex`\vec T`} est le vecteur unitaire tangent à {tex`C`}.
          </p>
        </Definition>
        <Definition>
          {tex`
            \int_C \vec F \cdot \dd \vec r = \int_a^b \vec F(\vec r(t)) \cdot \frac {\dd \vec r} {\dd t} \dd t
          `}
        </Definition>
        <p>
          Cette intégrale est souvent appelée <strong>circulation</strong>.
        </p>
      </Slide>
      <Slide title="Travail d'une force">
        <Definition>
          {tex`
            W = \int_C \vec F \cdot \dd \vec r
          `}
        </Definition>
        <Example>
          <p>
            Trouvez le travail d'une force par le champ{' '}
            {tex`\vec F(x, y) = x^2 \vec i - x y \vec j`} le long du quart de cercle{' '}
            {tex`\vec r(t) = \cos t \vec i + \sin t \vec j`}, {tex`0 \leq t \leq \pi/2`}.
          </p>
        </Example>
        {py.jupyter`
          from sympy import *
          t = Symbol("t")
          F = lambda x, y: Matrix([x**2, -x*y])
          r = Matrix([cos(t), sin(t)])
          integrate(F(*r).dot(r.diff(t)), (t, 0, pi/2))
        `}
      </Slide>
      <Slide title="Exemple d'intégrale curviligne de champs de vecteurs">
        <Example>
          {tex`
            \int_C \vec F \cdot \dd \vec r,
            \quad
            \vec F(x, y, z) = x y \vec i + y z \vec j + z x \vec k
          `}
          où {tex`C`} est paramétré par {tex`(x, y, t) = (t, t^2, t^3)`} pour {tex`0 \leq t \leq 1`}
          .
        </Example>
        {py.jupyter`
          from sympy import *
          t = Symbol("t")
          F = lambda x, y, z: Matrix([x*y, y*z, z*x])
          r = Matrix([t, t**2, t**3])
          integrate(F(*r).dot(r.diff(t)), (t, 0, 1))
        `}
      </Slide>
      <Slide title="Théorème fondamental pour les intégrales curvilignes">
        <Recall>
          {tex`
            \int_a^b f'(x) \dd x = f(b) - f(a)
          `}
        </Recall>
        <Theorem>
          {tex`
            \int_C \grad f \cdot \dd \vec r
            = f(\vec r(b)) - f(\vec r(a))
          `}
        </Theorem>
        <ul>
          <li>L'intégrale ne dépend pas du chemin {tex`C`} mais seulement de ses extrémités</li>
          <li>La circulation d'un champ gradient sur un chemin fermé vaut {tex`0`}</li>
        </ul>
      </Slide>
      <Slide title="Calcul du travail d'un champ conservateur">
        <Example>
          <p>Calculez le travail du champ</p>
          {tex`
            \vec F(\vec x) = -\frac {m M G} {\norm x^3} \vec x
          `}
          <p>
            pour bouger une particule de masse {tex`m`} du point {tex`(3, 4, 12)`} au point{' '}
            {tex`(2, 2, 0)`}.
          </p>
        </Example>
        <p>On vérifie que le potentiel est donné par</p>
        {tex`
          f(x, y, z) = \frac {m M G} {\sqrt {x^2 + y^2 + z^2}}
        `}
        {py.jupyter`
          from sympy import *
          m, M, G = symbols("m M G")
          f = lambda x, y, z: (m * M * G) / sqrt(x**2 + y**2 + z**2)
          simplify(f(2, 2, 0) - f(3, 4, 12))
        `}
      </Slide>
      <Slide title="Existence d'un potentiel">
        <Question>
          <p>
            Quels champs de vecteurs sont conservatifs? (i.e. s'écrivent {tex`\vec F = \grad f`})
          </p>
        </Question>
        <Theorem>
          <p>
            Soit {tex`\vec F`} un champ de vecteur sur une région ouverte et connexe {tex`D`}. Si
            l'intégrale {tex`\int_C \vec F \cdot \dd \vec r`} ne dépend pas du chemin {tex`C`},
            alors {tex`\vec F = \grad f`}.
          </p>
        </Theorem>
        {tex`
          f(x, y) \defeq \int_{(a, b)}^{(x, y)} \vec F \cdot \dd \vec r
        `}
      </Slide>
      <Slide title="Existence d'un potentiel">
        <Question>
          <p>
            Quels champs de vecteurs sont conservatifs? (i.e. s'écrivent {tex`\vec F = \grad f`})
          </p>
        </Question>
        <Theorem>
          <p>
            Soit {tex`\vec F(x, y) = P(x, y) \vec i + Q(x, y) \vec j`} un champ de vecteur{' '}
            <strong>conservatif</strong>.
          </p>
          {tex`
            \frac {\partial F} {\partial y} = \frac {\partial Q} {\partial x}
          `}
        </Theorem>
        <p>
          Conséquence du théorème de Green (cf. plus tard): la réciproque est vraie sur des régions
          simplement connexes (sans trous ni poignées).
        </p>
      </Slide>
      <Slide title="Exemple: conservatifs?">
        <Example>
          <p>Déterminez si les champs de vecteurs</p>
          <ul>
            <li>{tex`\vec F(x, y) = (x - y) \vec i + (x - 2) \vec j`}</li>
            <li>{tex`\vec F(x, y) = (3 + 2xy) \vec i + (x^2 - 3y^2) \vec j`}</li>
          </ul>
        </Example>
        {py.jupyter`
          from sympy import *
          x, y = symbols("x y")
          F = Matrix([3 + 2*x*y, x**2 - 3*y**2])
          Eq(F[0].diff(y), F[1].diff(x))
        `}
      </Slide>
      <Slide title="Exemple: calcul de potentiel">
        <Example>
          <p>Trouvez une fonction {tex`f`} telle que</p>
          {tex`
            \grad f(x, y) = \underbrace{(3 + 2xy) \vec i + (x^2 - 3y^2) \vec j}_{\vec F(x, y)}.
          `}
          <p>Ensuite, évaluez l'intégrale {tex`\int_C \vec F \cdot \dd \vec r`}, où</p>
          {tex`
            \vec r(t) = e^t \sin t \, \vec i + e^t \cos t \, \vec j,
            \qquad 0 \leq t \leq \pi
          `}
        </Example>
        {py.jupyter`
          from sympy import *
          x, y = symbols("x y")
          F = Matrix([3 + 2*x*y, x**2 - 3*y**2])
          f = integrate(F[0], x)
          f = f + integrate(F[1] - f.diff(y), y)
        `}
        {py.jupyter`
          r = lambda t: {x: exp(t) * sin(t), y: exp(t) * cos(t)}
          f.subs(r(pi)) - f.subs(r(0))
        `}
      </Slide>
      <Slide title="Potentiel à 3 dimensions">
        <Example>
          <p>Trouvez {tex`f`} tel que</p>
          {tex`
            \grad f = y^2 \, \vec i + (2xy + e^{3z}) \vec j + 3y e^{3 z} \vec k
          `}
        </Example>
        {py.jupyter`
          from sympy import *
          x, y, z = symbols("x y z")
          F = Matrix([y**2, 2*x*y + exp(3*z), 3*y*exp(3*z)])
          f = integrate(F[0], x)
          f = f + integrate(F[1] - f.diff(y), y)
          f = f + integrate(F[2] - f.diff(z), z)
        `}
      </Slide>
      <Slide title="Circulation sur un chemin fermé">
        {tex`
          \oint_C \vec F \cdot \dd \vec r:
          \quad
          \text{circulation sur une courbe } C \text{ fermée}
        `}
        <Remark>
          <p>
            Si {tex`\vec F`} est conservatif ({tex`\vec F = \grad f`}), alors
          </p>
          {tex`
            \oint_C \vec F \cdot \dd r = 0.
          `}
        </Remark>
        <ul>
          <li>
            Électrostatique: la circulation du champ électrique sur un chemin fermé est nulle.
          </li>
          <li>
            La circulation du champ magnétique est proportionnelle au courant
            <Figure src="magnetic-field.png" alt="Champ magnétique" />
          </li>
          <li>Plus tard: rotationnel = densité de circulation</li>
        </ul>
      </Slide>
      <Slide title="Théorème de Green: introduction">
        <Recall>
          {tex`
            \underbrace{\int_a^b \overbrace{f'(x)}^{\text{local}} \dd x}_{\text{intérieur}} = \underbrace{f(b) - f(a)}_{\text{bord}}
          `}
        </Recall>
        <Recall>
          <li>
            Si {tex`\vec F(x, y) = \grad f(x, y)`}, alors {tex`\partial_x F_2 = \partial_y F_1`} par
            symétrie des dérivées secondes.
          </li>
          <li>
            Sur une courbe {tex`C`} fermée
            {tex`
              \oint_C \vec F \cdot \dd \vec r = 0
            `}
          </li>
        </Recall>
      </Slide>
      <Slide title="Un exemple du théorème de Green">
        <Proposition title="Cas particulier du théorème de Green">
          {tex`
            \oint_{C} \vec F \cdot \dd \vec r
            = \iint_{[a, b] \times [c, d]} \partial_x F_2 - \partial_y F_1 \dd A
          `}
          <p>
            où {tex`C`} est le contour de {tex`[a, b] \times [c, d]`} parcouru dans le sens
            anti-horloger.
          </p>
        </Proposition>
        <Remark>
          <p>
            La notation {tex`\oint`} est une intégrale normale, elle souhaite simplement insister
            que celle-ci se fait sur une courbe fermée dans le sens anti-horloger.
          </p>
        </Remark>
      </Slide>
      <Slide title="Green's Theorem">
        <Theorem title="Green">
          {tex`
            \oint_C \vec F \cdot \vec r
            = \iint_D \partial_x F_2 - \partial_y F_1 \dd A
          `}
        </Theorem>
        En particulier, si {tex`F = (P, Q)`}
        {tex`
          \oint_C P \dd x + Q \dd y = \iint \frac {\partial Q} {\partial x} - \frac {\partial P} {\partial y} \dd A.
        `}
      </Slide>
      <Slide title="Théorème de Green: exemple">
        <Example>
          <p>Évaluez l'intégrale</p>
          {tex`
            \oint_C x^4 \dd x + xy \dd y
          `}
          <p>
            où {tex`C`} est le triangle dont les sommets sont {tex`(0, 0)`}, {tex`(1, 0)`} et{' '}
            {tex`(0, 1)`}
          </p>
        </Example>
        {py.jupyter`
          from sympy import *
          x, y = symbols("x y")
          P, Q = x**4, x*y
          integrate(Q.diff(x) - P.diff(y), (y, 0, 1 - x), (x, 0, 1))
        `}
      </Slide>
      <Slide title="Théorème de Green: exemple">
        <Example>
          <p>Évaluez l'intégrale</p>
          {tex`
            \oint_C (3 y - e^{\sin x}) \dd x + (7x + \sqrt{y^4 + 1}) \dd y
          `}
          <p>
            où {tex`C`} est le cercle d'équation {tex`x^2 + y^2 = 9`}.
          </p>
        </Example>
        {py.jupyter`
          from sympy import *
          x, y = symbols("x y")
          P, Q = 3*y - exp(sin(x)), 7*x + sqrt(y**4 + 1)
          limits = [(y, -sqrt(9 - x**2), sqrt(9 - x**2)), (x, -3, 3)]
          integrate(Q.diff(x) - P.diff(y), *limits)
        `}
      </Slide>
      <Slide title="Calcul d'aire">
        <Recall>
          {tex`
            \oint_C \vec F \cdot \vec r
            = \iint_D \partial_x F_2 - \partial_y F_1 \dd A
          `}
        </Recall>
        <p>Si {tex`\vec F = \partial_x F_2 - \partial_y F_1 = 1`}, alors</p>
        {tex`
          \oint_C \vec F \cdot \vec r
          = \text{aire}(D)
        `}
      </Slide>
      <Slide title="Area calculation">
        <Example>
          <p>Find the area enclosed by the ellipse</p>
          {tex`
            \frac {x^2} {a^2} + \frac {y^2} {b^2} = 1
          `}
        </Example>
        {py.jupyter`
          from sympy import *
          a, b, t = symbols("a b t")
          x, y = a * cos(t), b * sin(t)
          integrate(x/2 * y.diff(t) - y/2 * x.diff(t), (t, 0, 2*pi))
        `}
      </Slide>
      <Slide title="Théorème de Green sur une région non simple">
        <Example>
          <p>Évaluez</p>
          {tex`
            \oint_C y^2 \dd x + 3 x y \dd y,
          `}
          <p>
            où {tex`C`} est la frontière de la région {tex`D`} telle que {tex`y \geq 0`} et{' '}
            {tex`1 \leq x^2 + y^2 \leq 4`}
          </p>
        </Example>
        {py.jupyter`
          from sympy import *
          x, y, r, theta = symbols("x y r theta")
          P, Q = y**2, 3*x*y
          integrand = (Q.diff(x) - P.diff(y))
          polar = integrand.subs({x: r*cos(theta), y: r*sin(theta)}) * r
          integrate(polar, (r, 1, 2), (theta, 0, pi))
        `}
      </Slide>
      <Slide title="Nabla ou del">
        <Definition>
          {tex`
            \del = \begin{pmatrix}
              \frac {\partial} {\partial x} \\
              \frac {\partial} {\partial y} \\
              \frac {\partial} {\partial z} \\
            \end{pmatrix}
          `}
        </Definition>
        <Example>
          <p>{tex`\grad f`} représente le gradient</p>
        </Example>
      </Slide>
      <Slide title="Rotationnel">
        <Definition>
          {tex`
            \rot \vec F
            = \begin{pmatrix}
              \partial_2 F_3 - \partial_3 F_2\\
              \partial_3 F_1 - \partial_1 F_3\\
              \partial_1 F_2 - \partial_2 F_1
            \end{pmatrix}
          `}
        </Definition>
      </Slide>
      <Slide title="Rotationnel: exemple">
        <Example>
          {tex`
            \vec F(x, y, z) = xz \vec i + xyz \vec j - y^2 \vec k
          `}
        </Example>
        {py.jupyter`
          from sympy import *
          from sympy.vector import *
          C, nabla = CoordSys3D(''), Del()
          x, y, z, i, j, k = C.x, C.y, C.z, C.i, C.j, C.k
          F = x*z*i + x*y*z*j - y**2*k
          nabla.cross(F).doit()
        `}
      </Slide>
      <Slide title="Rotationnel du gradient">
        <Theorem>
          {tex`
            \rot (\grad f) = \vec 0
          `}
        </Theorem>
        {py.jupyter`
          from sympy import *
          from sympy.vector import *
          nabla = Del()
          x, y, z = symbols("x y z")
          f = Function("f")(x, y, z)
          nabla.cross(gradient(f)).doit()
        `}
        <Corollary>
          <p>
            Si {tex`\vec F`} est conservatif, alors {tex`\curl \vec F = \vec 0`}.
          </p>
        </Corollary>
      </Slide>
      <Slide title="Exemple: champ non conservatif">
        <Example>
          <p>Montrez que le champ de vecteur</p>
          {tex`
            \vec F(x, y, z) = xz \vec i + xyz \vec j - y^2 \vec k
          `}
          <p>n'est pas conservatif.</p>
        </Example>
        {py.jupyter`
          from sympy import *
          from sympy.vector import *
          C, nabla = CoordSys3D(''), Del()
          x, y, z, i, j, k = C.x, C.y, C.z, C.i, C.j, C.k
          F = x*z*i + x*y*z*j - y**2*k
          nabla.cross(F).doit()
        `}
      </Slide>
      <Slide title="Champs conservatifs">
        <Theorem>
          <ul>
            <li>
              Si {tex`\vec F`} est conservatif, alors {tex`\rot \vec F = \vec 0.`}
            </li>
            <li>
              Si {tex`\rot \vec F = \vec 0`} et le domaine n'a pas de trou, alors {tex`\vec F`} est
              conservatif.
            </li>
          </ul>
        </Theorem>
        <Example>
          <p>Montrez que</p>
          {tex`
            \vec F(x, y, z) = y^2 z^3 \vec i + 2xyz^3 \vec j + 3xy^2z^2 \vec k
          `}
          <p>est conservatif et trouvez un potentiel</p>
        </Example>
        {py.jupyter`
          from sympy import *
          from sympy.vector import *
          C, nabla = CoordSys3D(''), Del()
          x, y, z, i, j, k = C.x, C.y, C.z, C.i, C.j, C.k
          F = y**2*z**3*i + 2*x*y*z**3*j + 3*x*y**2*z**2*k
          nabla.cross(F).doit()
        `}
      </Slide>
      <Slide title="Divergence">
        <Definition>
          {tex`
            \divergence \vec F = \partial_x F_1 + \partial_y F_2 + \partial_z F_3
          `}
        </Definition>
        {py.jupyter`
          from sympy import *
          from sympy.vector import *
          C, nabla = CoordSys3D(''), Del()
          x, y, z, i, j, k = C.x, C.y, C.z, C.i, C.j, C.k
          F = x*z*i + x*y*z*j - y**2*k
          nabla.dot(F).doit()
        `}
      </Slide>
      <Slide title="Divergence du rotationnel">
        <Theorem>
          {tex`
            \divergence (\curl \vec F) = 0
          `}
        </Theorem>
        {py.jupyter`
          from sympy import *
          from sympy.vector import *
          C, nabla = CoordSys3D(''), Del()
          x, y, z = symbols("x y z")
          F1 = Function("F1")(x, y, z)
          F2 = Function("F2")(x, y, z)
          F3 = Function("F3")(x, y, z)
          F = F1*C.i + F2*C.j + F3*C.k
          nabla.dot(nabla.cross(F)).doit()
        `}
      </Slide>
      <Slide title="Exemple">
        <Example>
          <p>Montrez que le champ de vecteur</p>
          {tex`
            \vec F(x, y, z) = x z \vec i + xyz \vec j - y^2 \vec k
          `}
          <p>ne peut être écrit comme un rotationnel.</p>
        </Example>
        {py.jupyter`
          from sympy import *
          from sympy.vector import *
          C, nabla = CoordSys3D(''), Del()
          x, y, z, i, j, k = C.x, C.y, C.z, C.i, C.j, C.k
          F = x*z*i + x*y*z*j - y**2*k
          nabla.dot(F).doit()
        `}
      </Slide>
      <Slide title="Laplacien">
        <Definition>
          {tex`
            \nabla^2 = \nabla \cdot \nabla
          `}
        </Definition>
        {tex`
          \nabla^2 f = 0 \quad \text{(Équation de Laplace)}
        `}
      </Slide>
      <Slide title="Le théorème de Green revisité">
        <Theorem>
          {tex`
            \oint_C \vec F \cdot \dd \vec r = \iint_D \curl \vec F \cdot \vec k \dd A
          `}
          {tex`
            \oint_C \vec F \cdot \vec n \dd s = \iint_D \divergence \vec F(x, y) \dd A
          `}
        </Theorem>
      </Slide>
    </Slideshow>
  )
}
