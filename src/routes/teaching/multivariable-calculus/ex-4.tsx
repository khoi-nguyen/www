const meta: Metadata = {
  title: 'Séance 4',
  description: 'Séance 4',
  lang: 'fr',
}

export default function () {
  return (
    <Slideshow meta={meta}>
      <Slide title="15.3.31">
        {tex`
          \begin{cases}
            x &= r \cos \theta\\
            y &= r \sin \theta\\
          \end{cases}
          \quad \Longleftrightarrow \quad
          \begin{cases}
            r^2 &= x^2 + y^2\\
            \tan \theta &= \frac y x
          \end{cases}
        `}
        <Exercise>
          <p>Évaluez l'intégrale en passant en coordonnées polaires</p>
          {tex`
            \int_0^{1/2} \int_{\sqrt 3 y}^{\sqrt {1 - y^2}} xy^2 \dd x \dd y
          `}
        </Exercise>
        <ul>
          <li>Indication: tracez le domaine en {tex`x, y`}</li>
          <li>N'oubliez pas {tex`\dd A = r \dd r \dd \theta`}</li>
        </ul>
        {py.jupyter`
          from sympy import *
          x, y = symbols("x y")
          integrate(x*y**2, (x, sqrt(3)*y, sqrt(1-y**2)), (y, 0, Rational(1, 2)))
        `}
      </Slide>
      <Slide title="15.5.12">
        {tex`
          \text{Aire du graphe de } f = \iint_D \sqrt{
            1 +
            \left(\frac {\partial f} {\partial x}\right)^2
            +
            \left(\frac {\partial f} {\partial y}\right)^2
          } \dd A
        `}
        <Exercise>
          <p>Trouvez l'aire de la partie de la sphère</p>
          {tex`
            x^2 + y^2 + z^2 = 4z
          `}
          <p>qui se trouve dans le paraboloïde {tex`z = x^2 + y^2`}.</p>
        </Exercise>
        <h3>Indications</h3>
        <ul>
          <li>Écrire la sphère sous la forme {tex`(x - a)^2 + (y - b)^2 + (z - c)^2 = r^2`}</li>
          <li>Intersection des courbes: écrire une équation en {tex`z`}</li>
        </ul>
        {py.jupyter`
          from sympy import *
          x, y = symbols("x y")
          z = 2 + sqrt(4 - x**2 - y**2)
          integrand = simplify(sqrt(1 - z.diff(x)**2 + z.diff(y)**2))
          # TODO: limits
        `}
      </Slide>
      <Slide title="15.6.18">
        <Exercise>
          <p>Évaluez l'intégrale</p>
          {tex`
            \iiint_E z \dd V,
          `}
          <p>
            où {tex`E`} est délimitée par le cylindre {tex`y^2 + z^2 = 9`}, et les plans{' '}
            {tex`x = 0`}, {tex`y = 3x`} et {tex`z = 0`}
          </p>
        </Exercise>
        {py.jupyter`
          from sympy import *
          x, y, z = symbols("x y z")
          integrate(z, (z, 0, sqrt(9-y**2)), (y, 3*x, 3), (x, 0, 1))
        `}
      </Slide>
      <Slide title="15.7.28">
        {tex`
          m = \iiint_E \rho(x, y, z) \dd V
        `}
        <Exercise>
          <p>
            Trouvez la masse d'une balle {tex`x^2 + y^2 + z^2 \leq a^2`} si la densité est
            proportionnelle à la distance à l'axe des {tex`z`}. Exprimez votre réponse en terme de
            {tex`
              \int_0^a r^2 \sqrt{a - r^2} \dd r
            `}
          </p>
        </Exercise>
      </Slide>
    </Slideshow>
  )
}
