const meta: Metadata = {
  title: 'Séance 8',
  description: 'Séance 8',
  lang: 'fr',
}

export default function () {
  return (
    <Slideshow meta={meta} hideBoards={new Date('2024-04-25 16:00')}>
      <Slide title="Optimisation">
        <Exercise>
          <p>Trouvez le minimum local de la fonction</p>
          {tex`
            f(x, y) = 3 x^2 + 2 y^3 - 6xy
          `}
        </Exercise>
      </Slide>
      <Slide title="Optimisation: solution">
        {py.jupyter`
          from sympy import *
          x, y = symbols("x y")
          f = 3*x**2 + 2*y**3 - 6*x*y
          critical = solve([f.diff(x), f.diff(y)])
          H = Matrix([[f.diff(x, 2), f.diff(x, y)], [f.diff(x, y), f.diff(y, y)]])
          { str(critical[0]): H.subs(critical[0]), str(critical[1]): H.subs(critical[0]) }
        `}
        <NumericPoll id="x-minimum-of-3x^2+2y^3-6xy" answer="1">
          <p>
            Quelle est la coordonnée {tex`x`} du minimum de {tex`f`}?
          </p>
        </NumericPoll>
        <NumericPoll id="y-minimum-of-3x^2+2y^3-6xy" answer="1">
          <p>
            Quelle est la coordonnée {tex`y`} du minimum de {tex`f`}?
          </p>
        </NumericPoll>
      </Slide>
      <Slide title="Théorème de la divergence">
        <Exercise title="16.9.3">
          <p>Montrez que le théorème de la divergence est vrai pour</p>
          {tex`
            \vec F(x, y, z) = z \vec i + y \vec j + x \vec k
          `}
          <p>sur la sphère de rayon {tex`4`} centrée à l'origine.</p>
        </Exercise>
      </Slide>
      <Slide title="Théorème de la divergence: correction" columns>
        <div>
          {py.jupyter`
            from sympy import *
            x, y, z = symbols("x y z")
            F = Matrix([z, y, x])
            div = F[0].diff(x) + F[1].diff(y) + F[2].diff(z)
          `}
          <h3>Intégrale de la divergence</h3>
          <NumericPoll id="16.9.3-divergence-value" answer="1">
            <p>Que vaut {tex`\divergence \vec F`}?</p>
          </NumericPoll>
          <NumericPoll id="volume-of-sphere-of-radius-4" answer={String.raw`\frac{4^4}{3}\pi`}>
            <p>Que vaut l'intégrale de la divergence?</p>
          </NumericPoll>
        </div>
        <div>
          {py.jupyter`
            from sympy import *
            phi, theta = symbols("phi theta")
            x = 4*sin(phi)*cos(theta)
            y = 4*sin(phi)*sin(theta)
            z = 4*cos(phi)
            r = Matrix([x, y, z])
            N = simplify(r.diff(phi).cross(r.diff(theta)))
            F = Matrix([z, y, x])
            integrate(F.dot(N), (theta, 0, 2*pi), (phi, 0, pi))
          `}
        </div>
      </Slide>
      <Slide title="Théorème de Stokes">
        <Exercise>
          <p>
            Trouvez le travail d'une particule se déplaçant le long de segments de droites de
            l'origine aux points {tex`(1, 0, 0)`}, {tex`(1, 2, 1)`}, {tex`(0, 2, 1)`} avant de
            revenir à l'origine, le tout sous l'influence de la force:
          </p>
          {tex`
            \vec F(x, y, z) = z^2 \vec i + 2xy\vec j + 4y^2 \vec k
          `}
        </Exercise>
      </Slide>
      <Slide title="Stokes: solution python">
        <p>On peut éviter de calculer 4 intégrales avec le théorème de Stokes.</p>
        {tex`
          \vec r(u, v) = u \begin{pmatrix}1\\ 0\\ 0\end{pmatrix}
          + v \begin{pmatrix}0\\ 2\\ 1\end{pmatrix}
          = \begin{pmatrix} u \\ 2 v \\ v\end{pmatrix}
        `}
        {py.jupyter`
          from sympy import *
          from sympy.vector import *
          C, nabla = CoordSys3D(''), Del()
          u, v = symbols("u v")
          x, y, z, i, j, k = C.x, C.y, C.z, C.i, C.j, C.k
          r = u*i + 2*v*j + v*k
          F = lambda x, y, z: z**2*i + 2*x*y*j + 4*y**2*k
          N = r.diff(u).cross(r.diff(v))
          integrand = F(r.dot(i), r.dot(j), r.dot(k)).dot(N)
        `}
        <NumericPoll id="calculus-16.8.17" answer={String.raw`\frac{29}{3}`}>
          <p>Que vaut la réponse finale?</p>
        </NumericPoll>
      </Slide>
    </Slideshow>
  )
}
