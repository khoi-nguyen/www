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
          z = Function("z")(x, y)
          r = Matrix([x, y, z])
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
        <p>En particulier, pour un graphe:</p>
        {tex`
          \iint_S \vec F \cdot \dd \vec S = \iint_D \vec F \cdot \left(-\frac {\partial z} {\partial x} \vec i - \frac {\partial z} {\partial y} \vec j + \vec k\right) \dd x \dd y
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
        <Recall>
          {tex`
            \dd \vec S = -\frac {\partial z} {\partial x} \vec i - \frac{\partial z} {\partial y} \vec j + \vec k
          `}
        </Recall>
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
          # We don't need to integrate at the bottom. Why?
          integrate(F(*r).dot(N), *limits)
        `}
      </Slide>
      <Slide title="Orientation induite sur le contour">
        <Figure src="induced-orientation.png" alt="Orientation induite" />
      </Slide>
      <Slide title="Théorème de Stokes">
        <Theorem>
          <p>
            Si {tex`S`} est gentille et orientée et sa frontière {tex`C`} est aussi gentille avec
            l'orientation induite,
          </p>
          {tex`
            \int_C \vec F \cdot \dd \vec r
            = \iint_S \curl \vec F \cdot \dd \vec S
          `}
        </Theorem>
        <p>Si {tex`S`} est un parallélipipède, c'est le théorème de Green.</p>
        <p>Si {tex`S_1, S_2`} sont deux surfaces avec le même contour, alors</p>
        {tex`
            \iint_{S_1} \curl \vec F \cdot \dd \vec S
            = \iint_{S_2} \curl \vec F \cdot \dd \vec S
        `}
      </Slide>
      <Slide title="Stokes: exemple">
        <Example>
          {tex`
            \int_C \vec F \cdot \dd \vec r,
            \quad \vec F(x, y, z) = -y^2 \vec i + x \vec j + z^2 \vec k,
          `}
          <p>
            où {tex`C`} est l'intersection entre le plan {tex`y + z = 2`} et le cylindre{' '}
            {tex`x^2 + y^2 = 1`}, orienté dans le sens anti-horloger vu par le dessus.
          </p>
        </Example>
        {py.jupyter`
          from sympy import *
          from sympy.vector import *
          C, nabla = CoordSys3D(''), Del()
          x, y, z, i, j, k = C.x, C.y, C.z, C.i, C.j, C.k
          F = -y**2*i + x*j + z**2*k
          integrate(curl(F).dot(k), (y, -sqrt(1-x**2), sqrt(1-x**2)), (x, -1, 1))
        `}
      </Slide>
      <Slide title="Stokes: exemple">
        <Example>
          {tex`
            \iint_S \curl \vec F \cdot \dd \vec S,
            \quad \vec F(x, y, z) = xz \vec i + yz \vec j + xy \vec k
          `}
          <p>
            où {tex`S`} est la partie de la sphère {tex`x^2 + y^2 + z^2 = 4`} contenue dans le
            cylindre {tex`x^2 + y^2 = 1`} et au-dessus du plan {tex`xy`}.
          </p>
        </Example>
        {py.jupyter`
          from sympy import *
          t = Symbol("t")
          r = Matrix([cos(t), sin(t), sqrt(3)])
          F = lambda x, y, z: Matrix([x*z, y*z, x*y])
          integrate(F(*r).dot(r.diff(t)), (t, 0, 2*pi))
        `}
      </Slide>
      <Slide title="Interprétation du rotationnel">
        {tex`
          \text{masse} &= \iint_S \underbrace{\rho(x, y, z)}_{\text{densité de masse}} \dd S\\
          \text{charge} &= \iint_S \underbrace{\sigma(x, y, z)}_{\text{densité de charge}} \dd S\\
          \text{circulation} &= \iint_S \underbrace{\curl \vec F \cdot \vec n}_? \dd S
        `}
        <Remark>
          <p>Le rotationnel représente la densité de circulation</p>
        </Remark>
      </Slide>
      <Slide title="Théorème de la divergence">
        <Theorem title="Divergence (Ostrogradsky)">
          <p>
            Soit une région simple {tex`E`} dont la surface {tex`S`} est munie de l'orientation
            extérieure.
          </p>
          {tex`
            \iint_S \vec F \cdot \dd \vec S = \iiint_E \divergence \vec F \dd V
          `}
        </Theorem>
        <p>Preuve lorsque {tex`E = [a_1, b_1] \times [a_2, b_2] \times [a_3, b_3]`}</p>
        <Remark>
          <p>Le théorème de la divergence généralise le théorème fondamental de l'analyse</p>
          {tex`
            \int_a^b f'(x) \dd x = f(b) - f(a)
          `}
        </Remark>
      </Slide>
      <Slide title="Exemple: calcul de flux">
        <Exercise>
          <p>
            Trouvez le flux du champ {tex`\vec F(x, y, z) = z \vec i + y \vec j + x \vec k`} à
            travers la sphère unité.
          </p>
        </Exercise>
        {py.jupyter`
          from sympy import *
          x, y, z, r, theta, phi = symbols("x y z r theta phi")
          F = Matrix([z, y, x])
          div = F[0].diff(x) + F[1].diff(y) + F[2].diff(z)
          spherical = { 
            x: r*sin(phi)*cos(theta),
            y: r*sin(phi)*sin(theta),
            z: r*cos(phi)
          }
          div = div.subs(spherical) * r**2 * sin(phi)
          integrate(div, (r, 0, 1), (phi, 0, pi), (theta, 0, 2*pi))
        `}
      </Slide>
      <Slide title="Exemple: calcul de flux">
        <Example>
          {tex`
            \vec F(x, y, z) = xy \vec i + (y^2 + e^{xz^2}) \vec j + \sin(x y) \vec k
          `}
          où {tex`S`} est la surface de la région {tex`E`} délimitée par {tex`z = 1 - x^2`},{' '}
          {tex`z = 0`}, {tex`y = 0`} et {tex`y + z = 2`}
        </Example>
        {py.jupyter`
          from sympy import *
          x, y, z, r, theta, phi = symbols("x y z r theta phi")
          F = Matrix([x*y, y**2 + exp(x*z**2), sin(x*y)])
          div = F[0].diff(x) + F[1].diff(y) + F[2].diff(z)
          integrate(div, (y, 0, 2-z), (z, 0, 1-x**2), (x, -1, 1))
        `}
      </Slide>
      <Slide title="Théorème de Gauss">
        <Theorem>
          <p>Soit le champ donné par</p>
          {tex`
            \vec E = \frac {1} {4 \pi \epsilon_0} \frac Q {\norm x^3} \vec x
          `}
          <p>
            Montrez que le flux ne dépend pas du choix de surface {tex`S`} contenant l'origine et
            que
          </p>
          {tex`
            \iint_S \vec E \cdot \dd \vec S = \frac Q {\epsilon 0}
          `}
        </Theorem>
        <Remark>
          <p>Ce théorème est également vrai pour le champ gravitationnel classique.</p>
        </Remark>
      </Slide>
      <Slide title="Interprétation de la divergence">
        {tex`
          \text{masse} &= \iiint_V \underbrace{\rho(x, y, z)}_{\text{densité de masse}} \dd V\\
          \text{charge} &= \iiint_V \underbrace{\sigma(x, y, z)}_{\text{densité de charge}} \dd V\\
          \text{flux} &= \iiint_V \underbrace{\divergence \vec F(x, y, z)}_{?} \dd V
        `}
      </Slide>
      <Slide title="Application: Maxwell dans le vide">
        <Proposition>
          {tex`
            \curl (\curl \vec A) = \grad (\divergence \vec A) - \nabla^2 \vec A
          `}
        </Proposition>
        <Exercise>
          {tex`
            \divergence \vec E = 0,\quad
            \curl \vec E = -\frac {-\partial \vec B} {\partial t},\\
            \divergence \vec B = 0,\quad
            \curl \vec B = \mu_0 \epsilon_0 \frac {-\partial \vec E} {\partial t},\\
          `}
        </Exercise>
        <p>Infos utiles:</p>
        {tex`
          \frac 1 {v^2} \frac {\partial^2 u} {\partial t^2} - \nabla^2 u = 0
          \quad \text{Équation d'onde}
        `}
        {py.jupyter`
          from math import sqrt
          mu0 = 1.25663706212 * 10**(-6)
          epsilon0 = 8.8541878128 * 10**(-12)
          c = 1 / sqrt(mu0 * epsilon0)
        `}
      </Slide>
    </Slideshow>
  )
}
