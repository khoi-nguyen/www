const meta: Metadata = {
  title: 'Séance 6',
  description: 'Séance 6',
  lang: 'fr',
}

export default function () {
  return (
    <Slideshow meta={meta}>
      <Slide title="16.4.18">
        <Recall title="Théorème de Green">
          {tex`
            \oint_C \vec F \cdot \underbrace{\dd \vec r}_{\begin{pmatrix}\dd x \\ \dd y\end{pmatrix}}
            = \iint_D \left(\partial_x F_2 - \partial_y F_1\right) \dd A
          `}
          <p>
            Comparez le membre de droite à la condition nécéssaire d'existence de potentiel et au
            rotationnel.
          </p>
        </Recall>
        <Exercise>
          <p>
            Une particule part de l'origine, se déplace le long de l'axe des {tex`x`} jusque{' '}
            {tex`(5, 0)`}, et ensuite le long du demi-cercle {tex`x^2 + y^2 = 25`},{' '}
            {tex`x, y \geq 0`} jusqu'au point {tex`(0, 5)`} et redescend vers l'origine via l'axe{' '}
            {tex`y`}. À l'aide du théorème de Green, trouvez le travail effectué sur la particule
            par le champ
          </p>
          {tex`
            \vec F(x, y) = \begin{pmatrix}
              \sin x\\ \sin y + xy^2 + \frac 1 3 x^3
            \end{pmatrix}
          `}
        </Exercise>
      </Slide>
      <Slide title="16.4.18: correction">
        {py.jupyter`
          from sympy import *
          x, y, r, theta = symbols("x y r theta")
          F = Matrix([sin(x), sin(y) + x*y**2 + x**3/3])
          curl = F[1].diff(x) - F[0].diff(y)
          curl = curl.subs({x: r*cos(theta), y: r*sin(theta)}) * r
          simplify(integrate(curl, (r, 0, 5), (theta, 0, pi/2)))
        `}
      </Slide>
      <Slide title="Nabla, divergence, rotationnel" columns>
        <div>
          <Definition title="Rotationnel">
            {tex`
              \underbrace{\vec{\nabla}}_{\text{nabla}}
              \overbrace{\times}^{\text{pr. vect.}} \vec F
            `}
          </Definition>
          {py.jupyter`
            from sympy import *
            from sympy.vector import *
            C, nabla = CoordSys3D(''), Del()
            x, y, z = symbols("x y z")
            F1 = Function("F1")(x, y, z)
            F2 = Function("F2")(x, y, z)
            F3 = Function("F3")(x, y, z)
            F = F1*C.i + F2*C.j + F3*C.k
            nabla.cross(F)
          `}
          {tex`
            \rot \vec F
            = \begin{pmatrix}
              \partial_2 F_3 - \partial_3 F_2\\
              \partial_3 F_1 - \partial_1 F_3\\
              \partial_1 F_2 - \partial_2 F_1
            \end{pmatrix}
          `}
        </div>
        <div>
          <Definition title="Divergence">
            {tex`
              \underbrace{\vec{\nabla}}_{\text{nabla}}
              \overbrace{\cdot}^{\text{pr. sc.}} \vec F
            `}
          </Definition>
          {py.jupyter`
            from sympy import *
            from sympy.vector import *
            C, nabla = CoordSys3D(''), Del()
            x, y, z = symbols("x y z")
            F1 = Function("F1")(x, y, z)
            F2 = Function("F2")(x, y, z)
            F3 = Function("F3")(x, y, z)
            F = F1*C.i + F2*C.j + F3*C.k
            nabla.dot(F)
          `}
          {tex`
            \divergence \vec F
            = \frac {\partial F_1} {\partial x}
            + \frac {\partial F_2} {\partial y}
            + \frac {\partial F_3} {\partial z}
          `}
        </div>
      </Slide>
      <Slide title="Interprétation de la divergence et du rotationnel" columns>
        <dl>
          <dt>Divergence</dt>
          <dd>
            <ul>
              <li>Tendance locale des lignes de champs à sortir autour d'un point</li>
              <li>Densité de flux</li>
            </ul>
            {tex`
                \divergence \vec F(x, y, z) \approx \frac {\iint_S \vec F \cdot \vec n \dd S} {\text{vol} V}
              `}
            où {tex`V`} est un petit volume autour de {tex`(x, y, z)`} dont la frontière est{' '}
            {tex`z`}.
          </dd>
          <dt>Rotationnel</dt>
          <dd>
            <ul>
              <li>Tendance locale des lignes de champs à tourner autour d'un point</li>
              <li>
                Vecteur dont les composantes indiquent la densité de circulation dans le plan
                normal.
              </li>
            </ul>
            {tex`
                (\curl \vec F(x, y, z)) \cdot \vec n \approx \frac 1 {\text{aire}\ A} \int_C \vec F \cdot \vec r
              `}
            où {tex`A`} est une petite surface perpendiculaire à {tex`\vec n`}, autour de{' '}
            {tex`(x, y, z)`} dont la frontière est {tex`C`}.
          </dd>
        </dl>
        <div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/ee/Divergence_%28captions%29.svg"
            width={800}
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c2/Curlorient.svg"
            width={600}
          />
        </div>
      </Slide>
      <Slide title="16.5.{9, 10, 11}">
        <Figure src="estimate-div-curl.png" alt="Exercice du calculus"></Figure>
      </Slide>
      <Slide title="16.5.{13, 17}">
        <Recall>
          {tex`
            \vec F = \grad V
            \quad \substack{\displaystyle \Longrightarrow \\ \displaystyle \underset{\text{simplement connexe}}{\Longleftarrow}} \quad
            \curl \vec F = \vec 0\\
            \vec F = \curl A
            \quad \substack{\displaystyle \Longrightarrow \\ \displaystyle \underset{\text{simplement connexe}}{\Longleftarrow}} \quad
            \divergence \vec F = 0\\
          `}
        </Recall>
        <Exercise>
          <p>Déterminer si le champ de vecteur est conservatif. Si oui, trouvez un potentiel</p>
          <ul>
            <li>{tex`\vec F(x, y, z) = y^2 z^3 \vec i + 2xyz^3 \vec j + 3xy^2z^2 \vec k`}</li>
            <li>{tex`\vec F(x, y, z) = e^{y z} \vec i + xz e^{y z} \vec j + x y e^{y z} \vec k`}</li>
          </ul>
        </Exercise>
      </Slide>
      <Slide title="16.5.{13, 17}: solution python">
        {py.jupyter`
          from sympy import *
          from sympy.vector import *
          C, nabla = CoordSys3D(''), Del()
          x, y, z, i, j, k = C.x, C.y, C.z, C.i, C.j, C.k
          F = y**2*z**3*i + 2*x*y*z**3*j + 3*x*y**2*z**2*k
          f = integrate(F.dot(i), x)
          f = f + integrate(F.dot(j) - f.diff(y), y)
          f = f + integrate(F.dot(k) - f.diff(z), z)
        `}
      </Slide>
      <Slide title="16.5.19: Potentiel vecteur">
        {tex`
          \text{fonction}
          \stackrel{\grad}{\longrightarrow}\
          \text{champ}
          \stackrel{\curl}{\longrightarrow}\
          \text{champ}
          \stackrel{\divergence}{\longrightarrow}\
          \text{fonction}
        `}
        <Recall>
          {tex`
            \vec F = \grad V
            \quad \substack{\displaystyle \Longrightarrow \\ \displaystyle \underset{\text{simplement connexe}}{\Longleftarrow}} \quad
            \curl \vec F = \vec 0\\
            \vec F = \curl A
            \quad \substack{\displaystyle \Longrightarrow \\ \displaystyle \underset{\text{simplement connexe}}{\Longleftarrow}} \quad
            \divergence \vec F = 0\\
          `}
        </Recall>
        <ul>
          <li>
            les conditions {tex`\Longleftarrow`} ne sont vraies que si le domaine est en un morceau
            et sans trous.
          </li>
          <li>Regardez les équations de Maxwell!</li>
        </ul>
        <Exercise>
          <p>Existe-t-il un champ de vecteur {tex`G : \R^3 \to \R^3`} tel que</p>
          {tex`
            \curl G =
            \begin{pmatrix}
              x \sin y\\
              \cos y\\
              z - xy
            \end{pmatrix}
          `}
        </Exercise>
      </Slide>
      <Slide title="16.5.19: solution python">
        {py.jupyter`
          from sympy import *
          from sympy.vector import *
          C, nabla = CoordSys3D(''), Del()
          x, y, z, i, j, k = C.x, C.y, C.z, C.i, C.j, C.k
          F = x*sin(y)*i + cos(y)*j + (z - x*y)*k
          divergence(F)
        `}
      </Slide>
    </Slideshow>
  )
}
