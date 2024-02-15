const meta: Metadata = {
  title: 'Séance 2',
  description: 'Séance 2',
  lang: 'fr',
}

export default function () {
  return (
    <Slideshow meta={meta}>
      <Slide title="Exercice 12.5.32">
        <Exercise>
          <p>Trouvez l'équation cartésienne du plan passant par</p>
          {tex`
            (2, 1, 2), \quad (3, -8, 6), \quad (-2, -3, 1)
          `}
        </Exercise>
        <Recall>
          {tex`
            \vec r \cdot \underbrace{\vec n}_{\substack{\text{vect.}\\ \text{normal}}} =
            \underbrace{\vec r_0}_{\text{point}} \cdot \vec n
          `}
        </Recall>
        {py.jupyter`
          from sympy import *
          x, y, z = symbols("x y z")
          A, B, C = Matrix([2, 1, 2]), Matrix([3, -8, 6]), Matrix([-2, -3, 1])
          n = (B - A).cross(C - A)
          eq = Eq(Matrix([x, y, z]).dot(n), A.dot(n))
          simplify(eq)
        `}
      </Slide>
      <Slide title="Exercice 12.5.37">
        <Exercise>
          <p>
            Trouve l'équation du plan qui passe par le point {tex`(3, 1, 4)`} et qui contient la
            droite d'intersection entre les plans
          </p>
          {tex`
            x + 2y + 3z &= 1\\
            2x - y + z &= -3
          `}
        </Exercise>
        <Recall>
          {tex`
            \vec r \cdot \underbrace{\vec n}_{\substack{\text{vect.}\\ \text{normal}}} =
            \underbrace{\vec r_0}_{\text{point}} \cdot \vec n
          `}
        </Recall>
        {py.jupyter`
          from sympy import *
          x, y, z = symbols("x y z")
          r0, r = Matrix([3, 1, 4]), Matrix([x, y, z])
          B = r.subs(solve([x + 2*y + 3*z - 1, 2*x - y + z + 3, x]))
          v = Matrix([1, 2, 3]).cross(B - r0)
          eq = Eq(n.dot(Matrix([x, y, z])), n.dot(r0))
          simplify(eq)
        `}
      </Slide>
      <Slide title="Exercice 12.5.58">
        <Exercise>
          <p>Trouvez les équations paramétriques de la droite d'intersection des plans</p>
          {tex`
            3x - 2y + z = 1,
            \quad
            2x + y - 3z = 3.
          `}
          <p>Ensuite, trouvez l'angle entre les plans.</p>
        </Exercise>
        <Recall>
          <ul>
            <li>{tex`\vec r = \vec r_0 + t \vec v`}</li>
            <li>Angle entre deux plans {tex`=`} angle entre leurs vecteurs normaux</li>
          </ul>
        </Recall>
        {py.jupyter`
          from sympy import *
          x, y, z, t = symbols("x y z t")
          n1, n2 = Matrix([3, -2, 1]), Matrix([2, 1, -3])
          r = Matrix([x, y, z])
          r0 = r.subs(solve([r.dot(n1) - 1, r.dot(n2) - 3, z]))
          v = n1.cross(n2)
          θ = acos(n1.dot(n2) / sqrt(n1.dot(n1) * n2.dot(n2)))
          [Eq(r, r0 + t * v), θ.evalf()]
        `}
      </Slide>
      <Slide title="Exercice 12.5.78">
        <Exercise>
          <p>Trouvez la distance entre les droites gauches:</p>
          {tex`
            \begin{cases}
              x = 1 + t\\
              y = 1 + 6t\\
              z = 2t
            \end{cases},
            \qquad
            \begin{cases}
              x = 1 + 2s\\
              y = 5 + 15s\\
              z = -2 + 6s
            \end{cases},
          `}
        </Exercise>
        <Recall>
          {tex`
            \text{dist}(\vec P_1, \text{plan}(\vec P_0, \vec n))
            = \frac {(\vec P_1 - \vec P_0) \cdot \vec n} {\norm{\vec n}}
          `}
        </Recall>
        {py.jupyter`
          from sympy import *
          s, t = symbols("s t")
          n = Matrix([1, 6, 2]).cross(Matrix([2, 15, 6]))
          P0, P1 = Matrix([1, 1, 0]), Matrix([1, 5, -2])
          abs((P1 - P0).dot(n)) / sqrt(n.dot(n))
        `}
      </Slide>
      <Slide title="Exercise 14.4.19">
        <Exercise>
          <p>Si {tex`f`} est différentiable et que</p>
          {tex`
            f(2, 5) = 6, \quad \partial_x f(2, 5) = 1, \quad \partial_y f(2, 5) = -1
          `}
          <p>utilisez une approximation linéaire pour estimer {tex`f(2,2; 4,9)`}</p>
        </Exercise>
        <Recall>
          {tex`
            \Delta f \approx df \defeq
            \frac {\partial f} {\partial x} \dd x
            + \frac {\partial f} {\partial y} \dd y
          `}
        </Recall>
        {py.jupyter`
          dx, dy = 0.2, -0.1
          df = 1 * dx + (-1) * dy
          6 + df
        `}
      </Slide>
      <Slide title="Exercice 14.4.26">
        <Recall>
          {tex`
            df \defeq
            \frac {\partial f} {\partial x} \dd x
            + \frac {\partial f} {\partial y} \dd y
          `}
        </Recall>
        <Exercise>
          <p>Trouvez la différentielle de la fonction suivante</p>
          {tex`
            u = \sqrt{x^2 + 3y^2}
          `}
        </Exercise>
        {py.jupyter`
          from sympy import *
          x, y, dx, dy = symbols("x y dx dy")
          u = sqrt(x**2 + 3*y**2)
          simplify(u.diff(x) * dx + u.diff(y) * dy)
        `}
      </Slide>
      <Slide title="Exercice 14.4.37">
        <Exercise>
          <p>La tension {tex`T`} dans le fil d'un yoyo est</p>
          {tex`
            T = \frac {m g R} {2 r^2 + R^2},
          `}
          <p>
            où {tex`m`} est la masse du yoyo, et {tex`g`} l'accélération dûe à la gravité. Utilisez
            les différentielles pour estimer le changement de la tension si {tex`R`} est augmentée
            de {tex`3`} à {tex`3.1`} et {tex`r`} de {tex`0,7`} cm à {tex`0.8cm`}
          </p>
        </Exercise>
        {py.jupyter`
          from sympy import *
          m, g, r, R = symbols("m g r R")
          T = (m * g * R) / (2 * r**2 + R**2)
          (T.diff(R) * 0.1 + T.diff(r) * 0.1).subs({R: 3, r: 0.7})
        `}
      </Slide>
    </Slideshow>
  )
}
