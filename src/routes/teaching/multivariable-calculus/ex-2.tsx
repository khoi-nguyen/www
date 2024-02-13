const meta: Metadata = {
  title: 'Séance 2',
  description: 'Séance 2',
  lang: 'fr',
}

export default function () {
  return (
    <Slideshow meta={meta}>
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
          <p>
            Un plan est déterminé par un <strong>vecteur normal</strong> {tex`\vec n`} et un point{' '}
            {tex`\vec r_0`}. L'équation cartésienne est ensuite donnée par
          </p>
          {tex`
            \vec r \cdot \vec n = \vec r_0 \cdot \vec n
          `}
        </Recall>
        {py.jupyter`
          from sympy import *
          x, y, z = symbols("x y z")
          r0 = Matrix([3, 1, 4])
          n = Matrix([1, 2, 3]).cross(Matrix([2, -1, 1]))
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
          t = symbols("t")
          n1 = Matrix([3, -2, 1])
          n2 = Matrix([2, 1, -3])
          v = n1.cross(n2)
          theta = acos(n1.dot(n2) / sqrt(n1.dot(n1) * n2.dot(n2)))
          [v, theta]
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
            f(2, 5) = 6, \quad \partial_x f(2, 5) = 1, \quad \partial_y(2, 5) = -1
          `}
          <p>utilisez une approximation linéaire pour estimer {tex`f(2,2; 4.9)`}</p>
        </Exercise>
        <Recall>
          {tex`
            \Delta f \approx df \defeq
            \frac {\partial f} {\partial x} \dd x
            + \frac {\partial f} {\partial y} \dd y
          `}
        </Recall>
      </Slide>
    </Slideshow>
  )
}
