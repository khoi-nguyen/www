const meta: Metadata = {
  title: 'Champs de vecteurs - partie II',
  subtitle: 'Chapitre 3',
  description: 'Intégrales de contour et de surface',
  lang: 'fr',
}

export default function () {
  return (
    <Slideshow meta={meta}>
      <Slide title="Résumé de l'intégration sur les courbes et surfaces" split={false}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Courbes planaires</th>
              <th>Surfaces</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Paramétrisation</td>
              <td>{tex`\vec r(t)`}</td>
              <td>{tex`\vec r(u, v)`}</td>
            </tr>
            <tr>
              <td>Plan tangent</td>
              <td>{tex`\frac {\dd \vec r} {\dd \vec t}`}: vecteur directeur</td>
              <td>
                {tex`\frac {\partial \vec r} {\partial \vec u}, \frac {\partial \vec r} {\partial \vec v}`}
                : vecteurs directeurs
                <br />
                {tex`\frac {\partial \vec r} {\partial \vec u} \times \frac {\partial \vec r} {\partial \vec v}`}
                : vecteur normal
              </td>
            </tr>
            <tr>
              <td>Élément de longueur/surface</td>
              <td>{tex`\dd s = \norm {\frac {\dd \vec r} {\dd t}} \dd t`}</td>
              <td>{tex`\dd S = \norm {\frac {\partial \vec r} {\partial u} \times \frac {\partial \vec r} {\partial v}} \dd A`}</td>
            </tr>
            <tr>
              <td>Élément de longueur/surface (graphe)</td>
              <td>{tex`\dd s = \sqrt {1 + \left(\frac {\dd y} {\dd x}\right)^2} \dd x`}</td>
              <td>{tex`\dd S = \sqrt {1 + \left(\frac {\partial z} {\partial x}\right)^2 + \left(\frac {\partial z} {\partial y}\right)^2} \dd x`}</td>
            </tr>
            <tr>
              <td>Intégration de champs de vecteurs</td>
              <td>{tex`\dd \vec r = \frac {\dd \vec r} {\dd t} \dd t`} (circulation)</td>
              <td>
                {tex`\dd \vec S = \frac {\partial \vec r} {\partial u} \times \frac {\partial \vec r} {\partial v} \dd A`}{' '}
                (flux)
              </td>
            </tr>
          </tbody>
        </table>
      </Slide>
      <Slide title="Paramétrisation de surfaces et élément d'aire">
        <p>Si une surface {tex`S`} est paramétrée par</p>
        {tex`
          \vec r(u, v) = x(u, v) \vec i + y(u, v) \vec j + z(u, v) \vec k,
          \qquad (u, v) \in D
        `}
        alors {tex`\dd S = \norm{\partial_u \vec r \times \partial_v \vec r} \dd u \dd v`}
      </Slide>
      <Slide title="Exemple: aire de la sphère">
        <Example>
          <p>Trouvez la surface d'une sphère de rayon {tex`a`}.</p>
        </Example>
        <Recall title="Coordonnées sphériques">
          {tex`
            x &= a \sin \phi \cos \theta\\
            y &= a \sin \phi \sin \theta\\
            z &= a \cos \phi
          `}
        </Recall>
        {py.jupyter`
          from sympy import *
          a, ϕ, θ = symbols('a phi theta', positive=True)
          x, y, z = a*sin(ϕ)*cos(θ), a*sin(ϕ)*sin(θ), a*cos(ϕ)
          r = Matrix([x, y, z])
          N = r.diff(ϕ).cross(r.diff(θ))
          dS = simplify(sqrt(N.dot(N)))
          integrate(dS, (ϕ, 0, pi), (θ, 0, 2*pi))
        `}
      </Slide>
      <Slide title="Paramétrisation de graphes">
        <p>Si la surface {tex`S`} est un graphe, alors une paramétrisation est donnée par</p>
        {tex`
          \vec r(x, y) = x \vec i + y \vec j + z(x, y) \vec k.
        `}
        <p>On vérifie par calculs que</p>
        {tex`
          \dd S &= \norm {\partial_u \vec r \times \partial_v \vec r} \dd u \dd v\\
          &= \sqrt {1 + \left(\frac {\partial z} {\partial x}\right)^2 + \left(\frac {\partial z} {\partial y}\right)^2} \dd x \dd y
        `}
        <p>
          Il est utile de pouvoir utiliser cette formule directement plutôt que de la recalculer.
        </p>
        {py.jupyter`
          from sympy import *
          x, y = symbols("x y")
          f = Function("f")(x, y)
          r = Matrix([x, y, f])
          N = r.diff(x).cross(r.diff(y))
          sqrt(N.dot(N))
        `}
      </Slide>
      <Slide title="Aire d'un graphe">
        <Recall>
          {tex`
            \dd S
            &= \sqrt {1 + \left(\frac {\partial z} {\partial x}\right)^2 + \left(\frac {\partial z} {\partial y}\right)^2} \dd x \dd y
          `}
        </Recall>
        <Example>
          <p>
            Trouvez l'aire de la partie du paraboloïde {tex`z = x^2 + y^2`} qui se trouve sous le
            plan {tex`z = 9`}
          </p>
        </Example>
        {py.jupyter`
          from sympy import *
          x, y, r, theta = symbols("x y r theta")
          z = x**2 + y**2
          dS = sqrt(1 + z.diff(x)**2 + z.diff(y)**2)
          dS = r * dS.subs({x: r*cos(theta), y: r*sin(theta)})
          integrate(dS, (r, 0, 3), (theta, 0, 2*pi))
        `}
      </Slide>
      <Slide title="Intégration sur une surface">
        <Example>
          {tex`
            \iint_S x^2 \dd S,
            \qquad S: \text{sphère unité}
          `}
        </Example>
        <Recall>
          <div class="columns is-vcentered">
            {tex`
              x &= r \sin \phi \cos \theta\\
              y &= r \sin \phi \sin \theta\\
              z &= r \cos \phi
            `}
            {tex`
              \dd S &= \norm{\partial_u \vec r \times \partial_v \vec r} \dd u \dd v\\
              r &= 1
            `}
          </div>
        </Recall>
        {py.jupyter`
          from sympy import *
          ϕ, θ = symbols('phi theta', positive=True)
          x, y, z = sin(ϕ)*cos(θ), sin(ϕ)*sin(θ), cos(ϕ)
          r = Matrix([x, y, z])
          N = r.diff(ϕ).cross(r.diff(θ))
          dS = simplify(sqrt(N.dot(N)))
          integrate(x**2 * dS, (ϕ, 0, pi), (θ, 0, 2*pi))
        `}
      </Slide>
      <Slide title="Intégration sur un graphe">
        <Example>
          {tex`
            \iint_S y \dd S
          `}
          <p>où {tex`S`} est la surface</p>
          {tex`
            z = x + y^2,
            \qquad 0 \leq x \leq 1, \, 0 \leq y \leq 2
          `}
        </Example>
        <Recall>
          {tex`
            \dd S
            &= \sqrt {1 + \left(\frac {\partial z} {\partial x}\right)^2 + \left(\frac {\partial z} {\partial y}\right)^2} \dd x \dd y
          `}
        </Recall>
        {py.jupyter`
          from sympy import *
          x, y = symbols("x y")
          z = x + y**2
          dS = sqrt(1 + z.diff(x)**2 + z.diff(y)**2)
          integrate(y * dS, (x, 0, 1), (y, 0, 2))
        `}
      </Slide>
      <Slide title="Surfaces orientées">
        <Figure src="orientation.png" alt="Orientation" />
        <p>L'intégrale de champ de vecteurs ne peut se faire que sur une surface orientée.</p>
        <Definition title="Orientation">
          <p>Une orientation est la donnée d'un champ continu de vecteurs normaux unitaire</p>
        </Definition>
        <Geogebra id="scxswung" height={400} />
      </Slide>
      <Slide title="Orientation d'un graphe">
        <Recall>
          {tex`
            \vec N = \partial_u \vec r \times \partial_v \vec r
          `}
        </Recall>
        <p>Pour un graphe {tex`z = f(x, y)`} nous avons</p>
        {tex`
          \vec N = -\frac {\partial f} {\partial x} \vec i - \frac {\partial f} {\partial y} \vec j + \vec k
        `}
        {py.jupyter`
          from sympy import *
          x, y = symbols("x y")
          f = Function("f")(x, y)
          r = Matrix([x, y, f])
          r.diff(x).cross(r.diff(y))
        `}
      </Slide>
      <Slide title="Flux">
        <Definition title="Flux">
          {tex`
            \iint_S \vec F \cdot \underbrace{\vec n \dd S}_{\dd \vec S}
          `}
        </Definition>
        {tex`
          \iint_S \vec F \cdot \dd \vec S = \iint_D \vec F \cdot \left(\frac {\partial \vec r} {\partial u} \times \frac {\partial \vec r} {\partial v}\right) \dd A
        `}
      </Slide>
      <Slide title="Flux: exemple">
        <Example>
          <p>
            Calculez le flux de {tex`\vec F(x, y, z) = z \vec i + y \vec j + x \vec k`} à travers la
            sphère unité
          </p>
        </Example>
        <Recall>
          {tex`
            \iint_S \vec F \cdot \dd \vec S = \iint_D \vec F \cdot \left(\frac {\partial \vec r} {\partial u} \times \frac {\partial \vec r} {\partial v}\right) \dd A
          `}
        </Recall>
        {py.jupyter`
          from sympy import *
          ϕ, θ = symbols('phi theta', positive=True)
          x, y, z = sin(ϕ)*cos(θ), sin(ϕ)*sin(θ), cos(ϕ)
          r = Matrix([x, y, z])
          N = r.diff(ϕ).cross(r.diff(θ))
          F = Matrix([z, y, x])
          integrate(F.dot(N), (ϕ, 0, pi), (θ, 0, 2*pi))
        `}
      </Slide>
      <Slide title="Flux à travers un graphe">
        <Example>
          {tex`
            \iint_S \vec F \cdot \dd \vec S,
            \quad \vec F(x, y, z) \defeq y \vec i + x \vec j + z \vec k,
          `}
          <p>
            {tex`S`} entre {tex`z = 1 - x^2 - y^2`} et {tex`z = 0`}
          </p>
        </Example>
        {py.jupyter`
          from sympy import *
          x, y, z = symbols("x y z")
          F = lambda x, y, z: Matrix([y, x, z])
          r = Matrix([x, y, 1 - x**2 - y**2])
          N = r.diff(x).cross(r.diff(y))
          limits = [(y, -sqrt(1-x**2), sqrt(1-x**2)), (x, -1, 1)]
          I = integrate(F(*r).dot(N), *limits)
          r = Matrix([x, y, 0])
          N = r.diff(x).cross(r.diff(y))
          I = I + integrate(F(*r).dot(N), *limits)
        `}
      </Slide>
    </Slideshow>
  )
}
