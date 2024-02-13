const meta: Metadata = {
  title: 'Dérivées partielles - part II',
  subtitle: 'Chapitre 1',
  description: 'Règle de composition, gradient, optimisation',
  lang: 'fr',
}

export default () => {
  return (
    <Slideshow meta={meta}>
      <Slide title="Composée (partie I)">
        <Recall title="Règle de composée pour fonctions à une variable">
          {tex`
            y = f(x(t)) \implies
            \frac {\dd y} {\dd t}
            = \frac {\dd f} {\dd x} \frac {\dd x} {\dd t}
          `}
        </Recall>
        <Proposition>
          {tex`
            z = f(x(t), y(t))
            \implies
            \frac {\dd z} {\dd t}
            = \frac {\partial f} {\partial x} \frac {\dd x} {\dd t}
            + \frac {\partial f} {\partial y} \frac {\dd y} {\dd t}
          `}
        </Proposition>
      </Slide>
      <Slide title="Composée partie I: exemple">
        <Example>
          <p>
            Si {tex`z = x^2 y + 3x y^4`} où {tex`x = \sin 2t`} et {tex`y = \cos t`}, trouvez{' '}
            {tex`\frac {\dd z} {\dd t}`} lorsque {tex`t = 0`}.
          </p>
        </Example>
        {py.jupyter`
          from sympy import *
          x, y, t = symbols("x y, t")
          f = x**2 * y + 3 * x * y**4
          tdiff = f.subs({x: sin(2 * t), y: cos(t)}).diff(t)
          tdiff.subs({t: 0})
        `}
        <Example>
          <p>
            The pressure P (in kilopascals), volume V (in liters), and temperature T (in kelvins) of
            a mole of an ideal gas are related by the equation {tex`PV = 8.31T`}. Find the rate at
            which the pressure is changing when the temperature is 300 K and increasing at a rate of
            0.1 K/s and the volume is 100 L and increasing at a rate of 0.2 L/s.
          </p>
        </Example>
        {py.jupyter`
          from sympy import *
          t, T, V = symbols("t T V")
          P = Rational(831, 100) * T / V
          tdiff = P.subs({ T: 300 + 0.1 * t, V: 100 + 0.2 * t }).diff(t)
          tdiff.subs({ t: 0 })
        `}
      </Slide>
      <Slide title="Composée: deuxième cas">
        <Proposition>
          {tex`
            z = f(x(s, t), y(s, t))
            \implies
            &\frac {\partial z} {\partial s}
            = \frac {\partial f} {\partial x} \frac {\partial x} {\partial s}
            + \frac {\partial f} {\partial y} \frac {\partial y} {\partial s}\\
            &\frac {\partial z} {\partial t}
            = \frac {\partial f} {\partial x} \frac {\partial x} {\partial t}
            + \frac {\partial f} {\partial y} \frac {\partial y} {\partial t}
          `}
        </Proposition>
        <Example>
          <p>
            Si {tex`z = e^x \sin y`} où {tex`x = st^2`} et {tex`y = s^2 t`}, trouvez les dérivées
            partielles de {tex`z`} en fonction de {tex`s, t`}.
          </p>
        </Example>
        {py.jupyter`
          from sympy import *
          s, t = symbols("s t")
          x, y = s * t**2, s**2 * t
          z = exp(x) * sin(y)
          [z.diff(s), z.diff(t)]
        `}
      </Slide>
      <Slide title="Exemples">
        <Example>
          <p>
            Si {tex`u = x^4 y + y^2 z^3`}, où {tex`x = r s e^t`}, {tex`y = rs^2 e^{-t}`}, et{' '}
            {tex`z = r^2 s \sin t`}, trouvez la valeur de {tex`\partial_s u`} quand{' '}
            {tex`r = 2, s = 1, t = 0`}.
          </p>
        </Example>
        {py.jupyter`
          from sympy import *
          r, s, t = symbols("r s t")
          x, y, z = r * s * exp(t), r * s**2 * exp(-t), r**2 * s * sin(t)
          u = x**4 * y + y**2 * z**3
          u.diff(s).subs({ r: 2, s: 1, t: 0 })
        `}
      </Slide>
      <Slide title="Exemple: composée">
        <Example>
          <p>
            Si {tex`g(s, t) = f(s^2 - t^2, t^2 - s^2)`} et {tex`f`} est différentiable, montrez que{' '}
            {`g`} satisfait l'équation
          </p>
          {tex`
            t \frac {\partial g} {\partial s} + s \frac {\partial g} {\partial t} = 0.
          `}
        </Example>
        {py.jupyter`
          from sympy import *
          s, t = symbols("s t")
          f = Function("f")
          g = f(s**2 - t**2, t**2 - s**2)
          simplify(t * g.diff(s) + s * g.diff(t))
        `}
      </Slide>
      <Slide title="Composée: dérivée seconde">
        <Example>
          <p>
            Si {tex`z = f(x, y)`} a des dérivées partielles secondes continues et{' '}
            {tex`x = r^2 + s^2`} et {tex`y = 2 r s`}, trouvez {tex`\partial_r z`} et{' '}
            {tex`\partial_r^2 z`}.
          </p>
        </Example>
        {py.jupyter`
          from sympy import *
          r, s = symbols("r s")
          z = Function("z")
          z(r**2 + s**2, 2*r*s).diff(r)
        `}
      </Slide>
      <Slide title="Dérivées directionnelles">
        <Definition>
          {tex`
            \partial_{\vec u} f(x_0, y_0)
            \defeq \lim_{h \to 0}
            \frac {f(x_0 + ha, y_0 + hb) - f(x_0, y_0)} h,
            \quad \vec u = (a, b)
          `}
        </Definition>
        <Remark>
          <p>Les dérivées partielles sont des cas particuliers de dérivées directionnelles.</p>
        </Remark>
      </Slide>
      <Slide title="Dérivées directionnelles: animation">
        <Geogebra id="dssdmjbw" />
      </Slide>
      <Slide title="Dérivées directionnelles en fonction des partielles">
        <p>
          De manière surprenante, les dérivées directionnelles peuvent souvent être calculées en
          fonction des dérivées partielles
        </p>
        <Theorem>
          <p>
            Si {tex`f`} a des dérivées partielles continues autour de {tex`(x, y)`}, alors si{' '}
            {tex`\vec u = (a, b)`}
          </p>
          {tex`
            \partial_{\vec u} f(x, y) = \partial_x f(x, y) a + \partial_y f(x, y) b
          `}
        </Theorem>
        <p>Note à moi-même: preuve</p>
        <Example>
          <p>Calculez la dérivée directionnelle de</p>
          {tex`f(x, y) = x^3 - 3x y + 4 y^2`}
          <p>
            dans la direction du vecteur unitaire d'angle {tex`\pi/6`} lorsque {tex`x = 1, y = 2`}
          </p>
        </Example>
        {py.jupyter`
          from sympy import *
          x, y = symbols("x y")
          f = x**3 - 3*x*y + 4*y**2
          D = f.diff(x) * cos(pi/6) + f.diff(y) * sin(pi/6)
          D.subs({x: 1, y: 2})
        `}
      </Slide>
      <Slide title="Gradient">
        <Definition>
          {tex`
            \grad f(x, y) \defeq
            \frac {\partial f} {\partial x} \vec i
            + \frac {\partial f} {\partial x} \vec j
          `}
        </Definition>
        <p>Le théorème précédent devient</p>
        {tex`
          \frac {\partial f} {\partial \vec u} = \grad f \cdot \vec u
        `}
      </Slide>
      <Slide title="Gradient: interprétation">
        <Geogebra id="ANaWJE7H" />
      </Slide>
      <Slide title="Gradient: Exemple">
        <Example>
          <p>
            Calculez {tex`\grad f(0, 1)`} si
            {tex`f(x, y) = \sin x + e^{x y}`}
          </p>
        </Example>
        <Example>
          <p>
            Calculez {tex`\partial_{(2, 5)} f(2, -1)`} si
            {tex`f(x, y) = x^2 y^3 - 4 y`}
          </p>
        </Example>
        {py.jupyter`
          from sympy import *
          x, y = symbols("x y")
          f = x**2 * y**3 - 4*y
          D = f.diff(x) * 2 + f.diff(y) * 5
          D.subs({x: 2, y: -1})
        `}
      </Slide>
      <Slide title="Taux d'accroissement maximal">
        <Example>
          <ul>
            <li>
              Si {tex`f(x, y) = x e^y`} trouvez le taux d'accroissement de {tex`f`} au point{' '}
              {tex`P(2, 0)`} dans la direction de {tex`P`} à {tex`Q(\frac 1 2, 2)`}
            </li>
            <li>Dans quelle direction le taux est-il maximum? Quelle est la valeur?</li>
          </ul>
        </Example>
        <Example>
          <p>Supposons que la température a un point {tex`(x, y, z)`} est donnée par</p>
          {tex`
            T(x, y, z) = \frac {80} {1 + x^2 + 2y^2 + 3z^2} \quad \text{(celsius)}
          `}
          <p>
            Dans quelle direction la température croît-elle le plus vite à {tex`(1, 1, -2)`}? Quel
            est le taux d'accroissement maximal?
          </p>
        </Example>
        {py.jupyter`
          from sympy import *
          x, y, z = symbols("x y z")
          T = 80 / (1 + x**2 + 2*y**2 + 3*z**2)
          grad = Matrix([T.diff(x), T.diff(y), T.diff(z)])
          grad.subs({x: 1, y: 1, z: -2})
        `}
      </Slide>
      <Slide title="Plan tangent et gradient aux surfaces de niveau">
        <p>Le gradient est perpendiculaire aux courbes/surfaces de niveau, puisque</p>
        {tex`
          F(x(t), y(t), z(t)) = k \implies
          \grad F \cdot \vec r'(t) = 0.
        `}
        <p>
          En particulier, cela permet de trouver le plan tangent puisqu'on connaît un vecteur normal
        </p>
        <Example>
          <p>
            Trouvez les équations de la tangente et de la normale au point {tex`(-2, 1, -3)`} à
            l'ellipsoïde
          </p>
          {tex`
            \frac {x^2} 4 + y^2 + \frac {z^2} 9 = 3.
          `}
        </Example>
      </Slide>
      <Slide title="Exercises">
        <Iframe src="/calculus/14.5-14.6.pdf" />
      </Slide>
    </Slideshow>
  )
}
