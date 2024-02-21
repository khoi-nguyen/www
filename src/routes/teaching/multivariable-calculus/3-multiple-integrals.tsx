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
    </Slideshow>
  )
}
