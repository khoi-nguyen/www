const meta: Metadata = {
  title: 'Intégrales multiples',
  subtitle: 'Chapitre 2',
  description: 'Riemann, Fubini',
  lang: 'fr',
}

export default function () {
  return (
    <Slideshow meta={meta}>
      <Slide title="Intégrale: rappels">
        {tex`
          \int_a^b f(x) \dd x = \text{aire algébrique sous le graphe de } \left.f\right|_{[a, b]}
        `}
        <Theorem title="Théorème fondamental">
          {tex`
            \int_a^b \frac {\dd f} {\dd x} \dd x = f(b) - f(a)\\
            \frac {\dd} {\dd x} \int_a^x f(t) \dd t = f(x)
          `}
        </Theorem>
      </Slide>
      <Slide title="Intégrales itérées">
        <Example>
          <p>Évaluez les intégrales</p>
          {tex`
            \int_0^3 \int_1^2 x^2 y \dd y \dd x
            \quad \quad
            \int_1^2 \int_0^3 x^2 y \dd x \dd y
          `}
        </Example>
        {py.jupyter`
          from sympy import *
          x, y = symbols("x y")
          integrate(integrate(x**2 * y, (y, 1, 2)), (x, 0, 3))
        `}
      </Slide>
      <Slide title="Intégrale double sur un rectangle">
        <Definition>
          {tex`
            \iint_R f(x, y) \dd A = \text{volume algébrique sous le graphe de} \left.f\right|_R
          `}
        </Definition>
        <p>
          Si l'intégrale double existe, on peut <strong>échanger l'ordre d'intégration</strong>.
        </p>
        <Theorem title="Fubini">
          {tex`
            \iint_{[a, b] \times [c, d]} f(x, y) \dd A
            = \int_a^b \int_c^d f(x, y) \dd y \dd x
            = \int_c^d \int_a^b f(x, y) \dd x \dd y
          `}
        </Theorem>
      </Slide>
      <Slide title="Intégrale: interprétation" split={false}>
        <Geogebra id="kXwzQEKV" width={1400} />
      </Slide>
      <Slide title="Intégrales doubles: exemple">
        <Example>
          {tex`
            \iint_{[0, 2] \times [1, 2]} x - 3y^2 \dd A
          `}
        </Example>
        {py.jupyter`
          from sympy import *
          x, y = symbols("x y")
          integrate(x - 3*y**2, (x, 0, 2), (y, 1, 2))
        `}
        <Example>
          {tex`
            \iint_{[1, 2] \times [0, \pi]} y \sin(x y) \dd A
          `}
        </Example>
        {py.jupyter`
          integrate(y * sin(x*y), (x, 1, 2), (y, 0, pi))
        `}
      </Slide>
      <Slide title="Application: volumes">
        <Example>
          <p>
            Trouvez le volume du solide {tex`S`} qui est délimité par le paraboloïde hyperbolique{' '}
            {tex`x^2 + 2y^2 + z = 16`}, les plans {tex`x = 2`}, {tex`y = 2`}, et les plans des
            coordonnées.
          </p>
        </Example>
        {py.jupyter`
          from sympy import *
          x, y = symbols("x y")
          z = 16 - x**2 - 2*y**2
          integrate(z, (x, 0, 2), (y, 0, 2))
        `}
      </Slide>
      <Slide title="Example: intégrale séparable">
        <Example>
          <p>Calculez l'intégrale</p>
          {tex`
            \iint_{[0, \pi / 2]^2} \sin x \cos y \dd A
          `}
        </Example>
        {py.jupyter`
          from sympy import *
          x, y = symbols("x y")
          integrate(sin(x) * cos(y), (x, 0, pi/2), (y, 0, pi/2))
        `}
      </Slide>
      <Slide title="Valeur moyenne">
        <Definition>
          {tex`
            \text{moyenne} = \frac 1 {\mathrm{aire}(R)} \iint_R f(x, y) \dd A
          `}
        </Definition>
        <Example>
          <p>Calculez la moyenne de</p>
          {tex`
            f(x, y) \defeq x^2 y
          `}
          <p>sur le rectangle {tex`R = [-1, 1] \times [0, 5]`}.</p>
        </Example>
        {py.jupyter`
          from sympy import *
          x, y = symbols("x y")
          f = x**2 * y
          mean = integrate(f, (x, -1, 1), (y, 0, 5)) / 10
        `}
      </Slide>
      <Slide title="Double intégrale sur des régions générales">
        <Definition>
          <p>
            Si {tex`D`} est une région quelconque contenue dans un rectangle {tex`R`}, alors
          </p>
          {tex`
            \iint_D f(x, y) \dd A \defeq \iint_R F(x, y) \dd A,
          `}
          où {tex`F`} est l'extension par zéro de {tex`f`} sur {tex`R`}.
        </Definition>
      </Slide>
      <Slide title="Intégrale double de type I">
        <Example>
          <p>Évaluez l'intégrale</p>
          {tex`
            \iint_D x + 2y \dd A,
            \qquad
          `}
          <p>
            où {tex`D`} est sa surface déterminée par les paraboles {tex`y = 2x^2`} et{' '}
            {tex`y = 1 + x^2`}.
          </p>
        </Example>
        {py.jupyter`
          from sympy import *
          x, y = symbols("x y")
          integrate(x + 2*y, (y, 2*x**2, 1 + x**2), (x, -1, 1))
        `}
      </Slide>
      <Slide title="Intégrale double de type I: volume">
        <Example>
          <p>Trouvez le volume du solide sous le paraboloïde</p>
          {tex`
            z = x^2 + y^2
          `}
          <p>
            au dessus de la région formée par la droite {tex`y = 2x`} et la parabole {tex`y = x^2`}
          </p>
        </Example>
        {py.jupyter`
          from sympy import *
          x, y = symbols("x y")
          integrate(x**2 + y**2, (y, x**2, 2*x), (x, 0, 2))
        `}
      </Slide>
      <Slide title="Intégrale double de type II">
        <Example>
          <p>Evaluez</p>
          {tex`
            \iint_D xy \dd A,
          `}
          <p>
            où {tex`D`} est la région délimitée par la droite {tex`y = x - 1`} et la parabole{' '}
            {tex`y^2 = 2x + 6`}.
          </p>
        </Example>
        {py.jupyter`
          from sympy import *
          x, y = symbols("x y")
          integrate(x*y, (x, 1/2*y**2 - 3, y + 1), (y, -2, 4))
        `}
      </Slide>
      <Slide title="Exemple: tetrahèdre">
        <Example>
          <p>Trouvez le volume du tetrahèdre délimité par les plans</p>
          {tex`
            x + 2y + z = 2,\quad x = 2y,\quad x = 0,\quad y = 0.
          `}
        </Example>
        {py.jupyter`
          from sympy import * 
          x, y = symbols("x y")
          integrate(2 - x - 2*y, (y, x/2, 1-x/2), (x, 0, 1))
        `}
      </Slide>
      <Slide title="Application de Fubini">
        <Example>
          <p>Évaluez l'intégrale</p>
          {tex`
            \int_0^1 \int_x^1 \sin(y^2) \dd y \dd x
          `}
        </Example>
        {py.jupyter`
          from sympy import *
          x, y = symbols("x y")
          integrate(sin(y**2), (x, 0, y), (y, 0, 1))
        `}
      </Slide>
      <Slide title="Propriété des intégrales doubles">
        <Proposition title="Linéarité">
          {tex`
            \iint_D f(x, y) + g(x, y) \dd A
            &= \iint_D f(x, y) \dd A
            + \iint_D g(x, y) \dd A\\
            \iint_D cf(x, y) \dd A &= c \iint_D f(x, y) \dd A\\
          `}
        </Proposition>
        <Proposition title="Croissance">
          {tex`
            f(x, y) \geq g(x, y) \implies
            \iint_D f(x, y) \dd A
            \geq
            \iint_D g(x, y) \dd A
          `}
        </Proposition>
        <Proposition title="Additivité">
          <p>
            Si {tex`D_1`} et {tex`D_2`} ne se touchent que sur leurs frontières
          </p>
          {tex`
            D = D_1 \cup D_2
            \iint_D f(x, y) \dd A
            &= \iint_{D_1} f(x, y) \dd A
            + \iint_{D_2} f(x, y) \dd A
          `}
        </Proposition>
      </Slide>
      <Slide title="Estimation de l'intégrale">
        <Example>
          <p>Estimez l'intégrale</p>
          {tex`
            \iint_D e^{\sin x \cos y} \dd A,
          `}
          <p>
            où {tex`D`} est le disque centré à l'origine de rayon {tex`2`}
          </p>
        </Example>
      </Slide>
      <Slide title="Exercices">
        <Iframe src="/calculus/15.2.pdf" />
      </Slide>
      <Slide title="Coordonnées polaires">
        {tex`
          \begin{cases}
            x &= r \cos \theta\\
            y &= r \sin \theta
          \end{cases}
          \qquad \Longleftrightarrow \qquad
          \begin{cases}
            r &= \sqrt {x^2 + y^2}\\
            \tan \theta &= \frac y x
          \end{cases}
        `}
        <Question>
          <p>Quand les coordonnées polaires sont-elles utiles?</p>
        </Question>
      </Slide>
      <Slide title="Intégrales doubles en coordonnées polaires">
        <Recall title="Changement de variable">
          {tex`
            \int_a^b f(x) \dd x = \int_{t_a}^{t_b} f(x(t)) \frac {\dd x} {\dd t} \dd t
          `}
        </Recall>
        <Figure src="polar-coordinates.png" alt="Élément d'aire en coordonnées polaires" />
        <Proposition>
          {tex`
            \iint_R f(x, y) \dd A
            = \int_\alpha^\beta \int_a^b f(r \cos \theta, r \sin \theta) r \dd r \dd \theta,
          `}
          <p>
            où{' '}
            {tex`R \defeq \{ (r \cos \theta, r\sin \theta) : r \in [a, b], \theta \in [\alpha, \beta] \}`}
          </p>
        </Proposition>
      </Slide>
      <Slide title="Intégrales doubles en coordonnées polaires">
        {tex`
          \iint_R f(x, y) \dd A
          = \int_\alpha^\beta \int_a^b f(r \cos \theta, r \sin \theta) r \dd r \dd \theta,
        `}
        <Question>
          <p>Quand employer les coordonnées polaires?</p>
        </Question>
        <Remark>
          <p>N'oubliez pas le facteur {tex`r`} supplémentaire!</p>
          {tex`
            \boxed{
              \dd A = r \dd r \dd \theta
            }
          `}
        </Remark>
      </Slide>
      <Slide title="Intégration en coordonnées polaires: exemple">
        <Example>
          <p>Évaluez l'intégrale</p>
          {tex`
            \iint_R 3x + 4y^2 \dd A,
            \qquad R = \{(x, y) : y \geq 0, 1 \leq x^2 + y^2 \leq 4 \}
          `}
        </Example>
        {tex`
          \sin^2 \theta = \frac {1 - \cos 2 \theta} 2
        `}
        {py.jupyter`
          from sympy import *
          x, y, r, theta = symbols("x y r theta")
          f = 3 * x + 4 * y**2
          integrand = f.subs({x: r*cos(theta), y: r*sin(theta)}) * r
          integrate(integrand, (r, 1, 2), (theta, 0, pi))
        `}
      </Slide>
      <Slide title="Intégrale en coordonnées polaires: exemple">
        <Example>
          <p>
            Trouvez le volume du solide délimité par le plan {tex`z = 0`} et le paraboloïde{' '}
            {tex`z = 1 - x^2 - y^2`}.
          </p>
        </Example>
        {py.jupyter`
          from sympy import *
          r, theta = symbols("r theta")
          x, y = r * cos(theta), r * sin(theta)
          integrate((1 - x**2 - y**2) * r, (r, 0, 1), (theta, 0, 2*pi))
        `}
        <Remark>
          <p>Si on avait essayé d'intégrer en {tex`(x, y)`}, nous aurions eu</p>
          {tex`
            \int_{-1}^1 \int_{-\sqrt{1 - x^2}}^{\sqrt{1 - x^2}} 1 - x^2 - y^2 \dd y \dd x
          `}
        </Remark>
      </Slide>
      <Slide title="Un exemple un peu plus complexe">
        {py.plot`
          plt.axes(projection = 'polar')
          theta = np.arange(-np.pi/4, np.pi/4, 0.01)
          r = np.cos(2 * theta)
          plt.polar(theta, r)
        `}
        <Example>
          <p>
            Utilisez une intégrale double pour trouver l'aire comprise entre une boucle de{' '}
            {tex`r = \cos 2\theta`}
          </p>
        </Example>
        {py.jupyter`
          from sympy import *
          r, theta = symbols("r theta")
          integrate(r, (r, 0, cos(2*theta)), (theta, -pi/4, pi/4))
        `}
      </Slide>
      <Slide title="Un autre exemple">
        <Example>
          <p>
            Trouvez le volume du solide qui se trouve en dessous du paraboloïde {tex`z = x^2 + y^2`}
            , au-dessus du plan {tex`xy`} et à l'intérieur du cylindre {tex`x^2 + y^2 = 2x.`}
          </p>
        </Example>
        {py.jupyter`
          from sympy import *
          r, theta = symbols("r theta")
          integrate(r**3, (r, 0, 2 * cos(theta)), (theta, -pi/2, pi/2))
        `}
      </Slide>
      <Slide title="Exercises">
        <Iframe src="/calculus/15.3-15.4.pdf" />
      </Slide>
      <Slide title="Applications des intégrales doubles">
        <Definition title="Densité">
          {tex`
            \overbrace{\rho(x, y)}^{\text{densité}}
            = \lim \frac {\Delta m} {\Delta A}
          `}
        </Definition>
        {tex`
          m \approx \sum_i \sum_j \rho(x_{ij}, y_{ij}) \Delta A
        `}
        <p>Masse et densité sont reliées par la formule</p>
        {tex`
          \boxed{
            m = \iint_D \rho(x, y) \dd A
          }
        `}
      </Slide>
      <Slide title="Exemple: charge">
        <Example>
          <p>
            La charge est distribuée sur le triangle formés par les points{' '}
            {tex`(0, 1), (1, 0), (1, 1)`} avec la densité de charge suivante
          </p>
          {tex`
            \sigma (x, y) = x y
          `}
          <p>Calculez la charge totale</p>
        </Example>
        {py.jupyter`
          from sympy import *
          x, y = symbols("x y")
          integrate(x * y, (y, 1 - x, 1), (x, 0, 1))
        `}
      </Slide>
      <Slide title="Moments et centres de masse">
        <Recall>
          {tex`
            \text{moyenne}
            = \frac {\displaystyle \iint_E f(x, y) \rho(x, y) \dd A} {\displaystyle \iint_E \rho(x, y) \dd A},
            \quad \rho(x, y) \defeq 1
          `}
        </Recall>
        <p>
          De manière similaire, le centre de masse est une moyenne du vecteur position {tex`\vec r`}{' '}
          pondérée par la densité de masse.
        </p>
        {tex`
          \text{centre de masse}
          = \frac {\displaystyle \iint_E \vec r \rho(\vec r) \dd A(\vec r)} {
            \displaystyle \underbrace{\iint_E \rho(\vec r) \dd A(\vec r)}_{\text{masse}}
          }
        `}
      </Slide>
      <Slide title="Exemple: centre de masse">
        <Example>
          <p>
            Trouvez la masse et le centre de masse d'une lamelle triangulaire dont les sommets sont{' '}
            {tex`(0, 0)`}, {tex`(1, 0)`}, {tex`(0, 2)`} sachant que la densité est
          </p>
          {tex`
            \rho(x, y) = 1 + 3x + y
          `}
        </Example>
        {py.jupyter`
          from sympy import *
          x, y = symbols("x y")
          rho = 1 + 3 * x + y
          limits = [(y, 0, 2 - 2*x), (x, 0, 1)]
          m = integrate(rho, *limits)
          M_y = integrate(x * rho, *limits)
          M_x = integrate(y * rho, *limits)
          1/m * Matrix([M_y, M_x])
        `}
      </Slide>
      <Slide title="Exemple: centre de masse en coordonnées polaires">
        <Example>
          <p>
            La densité d'une lamelle est proportionnelle à la distance au centre du cercle. Trouvez
            son centre de masse
          </p>
        </Example>
        {py.jupyter`
          from sympy import *
          r, theta, a, C = symbols("r theta a C")
          rho = C * r
          limits = [(r, 0, a), (theta, 0, pi)]
          m = integrate(rho * r, *limits)
          M_y = integrate(r**2 * cos(theta) * rho, *limits)
          M_x = integrate(r**2 * sin(theta) * rho, *limits)
          1/m * Matrix([M_y, M_x])
        `}
      </Slide>
      <Slide title="Probabilité">
        {tex`
          \Pr((X, Y) \in D) = \iint_D \overbrace{
            f(x, y)}^{\text{densité de probabilité}
          } \dd A
        `}
        <Example>
          <p>Sachant que la densité jointe de {tex`X, Y`} est donnée par</p>
          {tex`
            f(x, y) \defeq
            \begin{cases}
              C(x + 2y) & \text{si } 0 \leq x \leq 100, 0 \leq y \leq 10\\
              0 & \text{sinon}
            \end{cases}
          `}{' '}
          =
          <p>
            trouvez la valeur de {tex`C`} et {tex`\P(X \leq 7, Y \geq 2)`}
          </p>
        </Example>
        {py.jupyter`
          from sympy import *
          x, y, C = symbols("x y C")
          f = C * (x + 2*y)
          f = f.subs(solve(Eq(integrate(f, (x, 0, 10), (y, 0, 10)), 1), dict=True)[0])
          integrate(f, (y, 2, 10), (x, 0, 7))
        `}
      </Slide>
      <Slide title="Intégrales triples">
        <Example>
          {tex`
            \iiint_B x y z^2 \dd V,
            \quad B \defeq \{
              (x, y, z) : 0 \leq x \leq 1, -1 \leq y \leq 2, 0 \leq z \leq 3
            \}
          `}
        </Example>
        {py.jupyter`
          from sympy import *
          x, y, z = symbols("x y z")
          integrate(x*y*z**2, (x, 0, 1), (y, -1, 2), (z, 0, 3))
        `}
      </Slide>
      <Slide title="Intégrale triple: ordre d'intégration">
        <Example>
          {tex`
            \iiint_E z \dd V
          `}
          <p>où {tex`E`} est le solide délimité par les plans</p>
          {tex`
            x = 0, \quad y = 0, \quad z = 0, \quad x + y + z = 1
          `}
        </Example>
        {py.jupyter`
          from sympy import *
          x, y, z = symbols("x y z")
          integrate(z, (z, 0, 1 - x - y), (y, 0, 1 - x), (x, 0, 1))
        `}
      </Slide>
      <Slide title="Intégrale triple: ordre d'intégration">
        <Example>
          {tex`
            \iiint_E \sqrt {x^2 + z^2} \dd V
          `}
          <p>
            où {tex`E`} est la région délimitée par le paraboloïde {tex`y = x^2 + z^2`} et le plan{' '}
            {tex`y = 4`}.
          </p>
        </Example>
        {tex`
          \iiint_E \sqrt {x^2 + z^2} \dd V
          &= \iint_{D} \left[ \int_{x^2 + z^2}^4 \sqrt{x^2 + z^2} \dd y \right] \dd A\\
          &= \iint_D (4 - x^2 - z^2) \underbrace{\sqrt {x^2 + z^2}}_r \dd A
        `}
        {py.jupyter`
          from sympy import *
          x, y, z = symbols("x y z")
          integrate(4 * r**2 - r**4, (r, 0, 2), (theta, 0, 2 * pi))
        `}
      </Slide>
      <Slide title="Application des intégrales triples">
        <Example>
          <p>
            Utilisez une intégrale triple pour trouver le <strong>volume</strong> du tétrahèdre
            délimité par les plans
          </p>
          {tex`
            x + 2y + z = 2,\quad
            x = 2y,\quad
            x = 0,\quad
            z = 0
          `}
        </Example>
        {py.jupyter`
          from sympy import *
          x, y, z = symbols("x y z")
          integrate(1, (z, 0, 2 - x - 2*y), (y, x/2, 1 - x/2), (x, 0, 1))
        `}
      </Slide>
      <Slide title="Application: centre de masse">
        {tex`
          m = \iiint_E \rho(x, y, z) \dd V
          \implies
          \text{centre de masse} \defeq \frac 1 m \iiint_E \rho(\vec r) \vec r \dd V
        `}
        <Example>
          <p>
            Trouvez le centre de masse du solide uniorme délimité par le cylindre parabolique{' '}
            {tex`x = y^2`} et les plans {tex`x = z`}, {tex`z = 0`}, {tex`x = 1`}.
          </p>
        </Example>
        {py.jupyter`
          from sympy import *
          x, y, z, rho = symbols("x y z rho")
          limits = [(z, 0, x), (x, y**2, 1), (y, -1, 1)]
          m = integrate(rho, *limits)
          M_yz = integrate(x * rho, *limits)
          M_xy = integrate(z * rho, *limits)
          M_xz = integrate(y * rho, *limits)
          Matrix([M_yz / m, M_xz / m, M_xy / m])
        `}
      </Slide>
      <Slide title="Coordonnées cylindriques">
        {tex`
          \underbrace{
            \text{coord. cylindriques}
          }_{(r, \theta, z)}
          = \underbrace{
            \text{coord. polaires en } (x, y)
          }_{(r, \theta)}+ z
        `}
        {tex`
          \begin{cases}
            x &= r \cos \theta\\
            y &= r \sin \theta\\
            z &= z
          \end{cases}
          \qquad
          \Leftrightarrow
          \qquad
          \begin{cases}
            r^2 &= x^2 + y^2\\
            \tan \theta &= \frac y x\\
            z &= z
          \end{cases}
        `}
      </Slide>
      <Slide title="Intégration en cooronnées cylindriques">
        <Example>
          <p>
            Un solide est contenu dans le cylindre {tex`x^2 + y^2 = 1`}, en-dessous du plan{' '}
            {tex`z = 4`} et au-dessus du paraboloïde {tex`z = 1 - x^2 - y^2`}. La densité est
            proportionnelle à la distance à l'axe du cylindre.
          </p>
        </Example>
        {tex`
          E = \left\{
            (r, \theta, z) :
            \theta \in [0, 2 \pi], r \in [0, 1], z \in [1 - r^2, 4]
          \right\}
        `}
        {py.jupyter`
          from sympy import *
          r, theta, z, C = symbols("r theta z C")
          m = integrate(C * r**2, (z, 1 - r**2, 4), (r, 0, 1), (theta, 0, 2*pi))
        `}
      </Slide>
      <Slide title="Intégrale multiple: changement de coordonnées">
        <Example>
          <p>Calculez</p>
          {tex`
            \int_{-2}^2 \int_{-\sqrt{4 - x^2}}^{\sqrt{4 - x^2}} \int_{\sqrt{x^2 + y^2}}^2
              x^2 + y^2
            \dd z \dd y \dd x
          `}
        </Example>
        {py.jupyter`
          from sympy import *
          r, theta, z = symbols("r theta z")
          integrate(r**3, (z, r, 2), (r, 0, 2), (theta, 0, 2*pi))
        `}
      </Slide>
      <Slide title="Exercises">
        <Iframe src="/calculus/15.3-15.4.pdf" />
      </Slide>
    </Slideshow>
  )
}
