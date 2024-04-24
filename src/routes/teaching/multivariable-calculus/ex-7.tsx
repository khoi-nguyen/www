const meta: Metadata = {
  title: 'Séance 7',
  description: 'Séance 7',
  lang: 'fr',
}

export default function () {
  return (
    <Slideshow meta={meta} hideBoards={new Date('2024-04-25 16:00')}>
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
                {tex`\vec N = \frac {\partial \vec r} {\partial \vec u} \times \frac {\partial \vec r} {\partial \vec v}`}
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
              <td>{tex`\dd S = \sqrt {1 + \left(\frac {\partial z} {\partial x}\right)^2 + \left(\frac {\partial z} {\partial y}\right)^2} \dd x \dd y`}</td>
            </tr>
            <tr>
              <td>Intégration de champs de vecteurs</td>
              <td>{tex`\dd \vec r = \frac {\dd \vec r} {\dd t} \dd t`} (circulation)</td>
              <td>
                {tex`\dd \vec S = \vec N \dd A`} (flux)
                {tex`
                  \vec N = \begin{cases}\displaystyle
                    \partial_u \vec r \times \partial_v \vec r & 
                    \text{cas général}\\
                    (-\partial_x z, -\partial_y z, 1) & \text{graphe}
                  \end{cases}
                `}
              </td>
            </tr>
          </tbody>
        </table>
      </Slide>
      <Slide title="16.7.23: Flux">
        <Recall title="Flux à travers un graphe">
          {tex`
            \iint_S \vec F \cdot \underbrace{\dd \vec S}_{\displaystyle \vec N \dd A},
            \qquad
            \vec N = \begin{pmatrix}
              -\partial_x z\\
              -\partial_y z\\
              1
            \end{pmatrix}
          `}
        </Recall>
        <Exercise>
          <p>Calculez le flux du champ de vecteur</p>
          {tex`
            \vec F(x, y, z) = xy \vec i + yz \vec j + zx \vec k
          `}
          <p>
            où {tex`S`} est la partie du paraboloïde {tex`z = 4 - x^2 - y^2`} qui est au-dessus du
            carré {tex`0 \leq x \leq 1`}, {tex`0 \leq y \leq 1`}.
          </p>
        </Exercise>
        <Remark>
          <p>
            Pour l'examen, vous devez aussi pouvoir calculer un flux dans le cas général, pas
            seulement celui d'un graphe.
          </p>
        </Remark>
      </Slide>
      <Slide title="16.7.23: solution">
        {py.jupyter`
          from sympy import *
          x, y, z = symbols("x y z")
          F = lambda x, y, z: Matrix([x*y, y*z, z*x])
          r = Matrix([x, y, 4 - x**2 - y**2])
          N = r.diff(x).cross(r.diff(y))
          integrate(F(*r).dot(N), (x, 0, 1), (y, 0, 1))
        `}
      </Slide>
      <Slide title="16.8.18: Théorème de Stokes">
        <Recall title="Théorème de Stokes">
          {tex`
            \iint_S \curl \vec F \cdot \dd \vec S
            = \oint_C \vec F \cdot \dd \vec r
          `}
        </Recall>
        <Exercise>
          <p>Vérifiez que le théorème de Stokes est valable pour le champ de vecteur</p>
          {tex`
            \vec F(x, y, z) = -2yz\vec i + y \vec j + 3x \vec k
          `}
          <p>
            où {tex`S`} est la partie du paraboloïde {tex`z = 5 - x^2 - y^2`} qui est au-dessus du
            plan {tex`z = 1`}, orientée vers le haut.
          </p>
        </Exercise>
      </Slide>
      <Slide title="16.8.18: solution" columns>
        <div>
          <h3>Flux du rotationnel</h3>
          {py.jupyter`
            from sympy import *
            from sympy.vector import *
            C, nabla = CoordSys3D(''), Del()
            x, y, z, i, j, k = C.x, C.y, C.z, C.i, C.j, C.k
            F = -2*y*z*i + y*j + 3*x*k

            r = x*i + y*j + (5 - x**2 - y**2)*k
            N = r.diff(x).cross(r.diff(y))
            curlF = curl(F).subs({z: 5 - x**2 - y**2})
            limits = [(y, -sqrt(4-x**2), sqrt(4-x**2)), (x, -2, 2)]
            integrate(curlF.dot(N), *limits)
          `}
        </div>
        <div>
          <h3>Circulation</h3>
          {py.jupyter`
            from sympy import *
            x,y, z, t = symbols("x y z t")
            F = lambda x, y, z: Matrix([-2*y*z, y, 3*x])
            r = Matrix([2*cos(t), 2*sin(t), 1])
            integrate(F(*r).dot(r.diff(t)), (t, 0, 2*pi))
          `}
        </div>
      </Slide>
      <Slide title="16.9.4: Théorème de la divergence">
        <Recall title="Théorème de la divergence">
          {tex`
            \iiint_E \divergence \vec F \dd V = \oiint_S \vec F \cdot \dd \vec S
          `}
        </Recall>
        <Exercise>
          <p>Vérifiez que le théorème de la divergence est valable pour le champ de vecteur</p>
          {tex`
            \vec F(x, y, z) = x^2 \vec i - y \vec j + z \vec k
          `}
          <p>
            où {tex`E`} est le cylindre donné par les équations {tex`y^2 + z^2 \leq 9`},{' '}
            {tex`0 \leq x \leq 2`}.
          </p>
        </Exercise>
      </Slide>
      <Slide title="16.9.4: solution" columns>
        <div>
          <h3>Calcul de {tex`\displaystyle \iiint_E \divergence \vec F \dd V`}</h3>
          {py.jupyter`
            from sympy import *
            x, y, z = symbols("x y z")
            F = Matrix([x**2, -y, z])
            div = F[0].diff(x) + F[1].diff(y) + F[2].diff(z)
            limits = [
              (y, -sqrt(9 - z**2), sqrt(9 - z**2)),
              (z, -3, 3),
              (x, 0, 2),
            ]
            integrate(div, *limits)
          `}
        </div>
        <div>
          <h3>Calcul de {tex`\displaystyle \oiint_S \vec F \cdot \dd \vec S`}</h3>
          {py.jupyter`
            from sympy import *
            x, y, z, t = symbols("x y z t")
            F = lambda x, y, z: Matrix([x**2, -y, z])

            # Surface latérale
            r = Matrix([x, 3*cos(t), 3*sin(t)])
            N = r.diff(t).cross(r.diff(x))
            I1 = integrate(F(*r).dot(N), (t, 0, 2*pi), (x, 0, 2))

            # Haut
            N = Matrix([1, 0, 0])
            I2 = F(x, y, z).dot(N).subs({x : 2}) * pi * 3**2

            # Bas
            N = Matrix([-1, 0, 0])
            I3 = F(x, y, z).dot(N).subs({x : 0}) * pi * 3**2

            I1 + I2 + I3
          `}
        </div>
      </Slide>
    </Slideshow>
  )
}
